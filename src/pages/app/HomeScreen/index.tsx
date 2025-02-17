import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
  FlatList,
  TextInput,
  Modal,
} from "react-native";
import { deleteUser, getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { api } from "../../../services/api";
import { Post } from "../../../components/Post";
import ReanimatedSwipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import { Option } from "../../../components/Option";
import { Toast } from "../../../components/Toast";

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export function HomeScreen() {
  const [userData, setUserData] = useState<{ role?: string }>({});
  const auth = getAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    author: "",
  });
  const [editPostId, setEditPostId] = useState<string | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const currentUser = auth.currentUser;
  const openSwipeableRef = useRef<SwipeableMethods | null>(null);

  useEffect(() => {
    async function loadUserData() {
      if (currentUser) {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
    }

    loadUserData();
  }, [currentUser]);

  async function loadPosts() {
    try {
      const response = await api.get("/posts");
      setPosts(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar os posts");
    }
  }

  async function createPost() {
    try {
      const response = await api.post("/posts", {
        title: newPost.title,
        content: newPost.content,
        author: newPost.author,
      });
      setPosts((prevPosts) => [...prevPosts, response.data]);
      setModalVisible(false);
      setNewPost({ title: "", content: "", author: "" });
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível criar o post");
    }
  }

  async function deletePost(postId: string) {
    try {
      await api.delete(`/posts/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      console.log("clicou", postId);
      Toast.success("Post deletado com sucesso.");
    } catch (error) {
      console.error(error);
      Toast.error("Não foi possível deletar o post");
    }
  }

  async function editPost() {
    if (!editPostId) return;

    try {
      const response = await api.put(`/posts/${editPostId}`, {
        title: newPost.title,
        content: newPost.content,
        author: newPost.author,
      });
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === editPostId ? response.data : post
        )
      );
      console.log("Editando post com ID:", editPostId);
      setIsEditModalVisible(false);
      setNewPost({ title: "", content: "", author: "" });
      setEditPostId(null);
    } catch (error) {
      console.error(error);
      console.log("erro:", error);
      Toast.error("Não foi possível editar o post");
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function handleSignOut() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  }

  function onSwipeableWillOpen(
    direction: "left" | "right",
    current: SwipeableMethods | null
  ) {
    if (direction === "right") {
      console.log("DELETE");
    }

    if (openSwipeableRef.current) {
      openSwipeableRef.current.close();
    }

    openSwipeableRef.current = current;
  }

  async function handleDeleteAccount() {
    if (!currentUser) return;

    Alert.alert(
      "Deletar Conta",
      "Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sim, deletar",
          style: "destructive",
          onPress: async () => {
            try {
              const db = getFirestore();
              await deleteDoc(doc(db, "users", currentUser.uid));
              await deleteUser(currentUser);
              console.log("currentUser: ", currentUser);
              Alert.alert("Sucesso", "Sua conta foi deletada com sucesso.");
            } catch (error) {
              console.error(error);
              Alert.alert(
                "Erro",
                "Erro ao deletar conta. Tente fazer login novamente."
              );
            }
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Você está na Home como {currentUser.email}
      </Text>

      {userData.role === "Professor" && (
        <View style={styles.professorContent}>
          <Text>Conteúdo exclusivo para professores</Text>
        </View>
      )}

      <View style={styles.postsContainer}>
        <Text style={styles.postsTitle}>Posts Recentes</Text>
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            let current: SwipeableMethods | null = null;

            return userData.role === "Professor" ? (
              <ReanimatedSwipeable
                ref={(swipeable) => (current = swipeable)}
                containerStyle={styles.swipeableContainer}
                overshootFriction={150}
                onSwipeableWillOpen={(direction) =>
                  onSwipeableWillOpen(direction, current)
                }
                renderRightActions={() => (
                  <View style={styles.rightActions}>
                    <Option
                      icon="edit"
                      backgroundColor="#00B960"
                      onPress={() => {
                        setEditPostId(item._id);
                        setNewPost({
                          title: item.title,
                          content: item.content,
                          author: item.author,
                        });
                        setIsEditModalVisible(true);
                      }}
                    />
                    <Option
                      icon="delete"
                      backgroundColor="#E83D55"
                      onPress={() => deletePost(item._id)}
                    />
                  </View>
                )}
              >
                <Post
                  title={item.title}
                  key={item._id}
                  author={item.author}
                  content={item.content}
                  createdAt={item.createdAt}
                />
              </ReanimatedSwipeable>
            ) : (
              <Post
                title={item.title}
                content={item.content}
                author={item.author}
                createdAt={item.createdAt}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
          refreshing={isLoading}
          onRefresh={loadPosts}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          ListEmptyComponent={() => <Text>Nenhum post encontrado</Text>}
        />
      </View>

      {userData.role === "Professor" && (
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={{ color: "#FFFFFF", fontSize: 17, marginBottom: 20 }}>
            Criar um post +
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>

      <Button title="Deletar conta" onPress={handleDeleteAccount} color="red" />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Criar um Post</Text>
            <TextInput
              style={styles.input}
              placeholder="Título do Post"
              value={newPost.title}
              onChangeText={(text) => setNewPost({ ...newPost, title: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Conteúdo do Post"
              value={newPost.content}
              onChangeText={(text) => setNewPost({ ...newPost, content: text })}
              multiline
            />
            <TextInput
              style={styles.input}
              placeholder="Nome do Autor"
              value={newPost.author}
              onChangeText={(text) => setNewPost({ ...newPost, author: text })}
            />
            <TouchableOpacity style={styles.buttonModal} onPress={createPost}>
              <Text style={styles.buttonText}>Criar Post</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Post</Text>
            <TextInput
              style={styles.input}
              placeholder="Título do Post"
              value={newPost.title}
              onChangeText={(text) => setNewPost({ ...newPost, title: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Conteúdo do Post"
              value={newPost.content}
              onChangeText={(text) => setNewPost({ ...newPost, content: text })}
              multiline
            />
            <TextInput
              style={styles.input}
              placeholder="Nome do Autor"
              value={newPost.author}
              onChangeText={(text) => setNewPost({ ...newPost, author: text })}
            />
            <TouchableOpacity style={styles.buttonModal} onPress={editPost}>
              <Text style={styles.buttonText}>Salvar Alterações</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsEditModalVisible(false)}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#0d0f1f",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: "#FFFFFF",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#FF3B30",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonModal: {
    width: "100%",
    height: 50,
    backgroundColor: "#007aff",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  professorContent: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  postsContainer: {
    width: 390,
    marginBottom: 20,
  },
  postsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FFFFFF",
  },
  postCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  postContent: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postAuthor: {
    fontSize: 12,
    color: "#888",
  },
  postDate: {
    fontSize: 12,
    color: "#888",
  },
  swipeableContainer: {
    borderRadius: 5,
  },
  rightActions: {
    flexDirection: "row",
  },
  content: {
    gap: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});
