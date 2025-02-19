import { TouchableOpacity, Alert, FlatList, Modal } from "react-native";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { api } from "../../../services/api";
import { Post } from "../../../components/Post";
import ReanimatedSwipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import { Option } from "../../../components/Option";
import { Toast } from "../../../components/Toast";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as S from "./styles";

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export function HomeScreen() {
  const auth = getAuth();
  const [userData, setUserData] = useState<{ role?: string }>({});
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
  const [search, setSearch] = useState<string>("");

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
      Toast.error("Não foi possível carregar os posts");
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
      Toast.error("Não foi possível criar o post");
    }
  }

  async function deletePost(postId: string) {
    try {
      await api.delete(`/posts/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
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
      setIsEditModalVisible(false);
      setNewPost({ title: "", content: "", author: "" });
      setEditPostId(null);
    } catch (error) {
      console.error(error);
      Toast.error("Não foi possível editar o post");
    }
  }

  async function searchPosts(term: string) {
    if (!term || term.trim() === "") {
      loadPosts();
      return;
    }

    try {
      const response = await api.get(
        `/posts/search?query=${encodeURIComponent(term)}`
      );
      setPosts(response.data);
    } catch (error) {
      console.error(
        "Erro ao buscar posts:",
        error.response ? error.response.data : error.message
      );
      Toast.error("Não foi possível buscar os posts");
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

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

  return (
    <S.Container>
      <S.Title>
        Bem-vindo(a)
      </S.Title>

      <S.Search>
        <S.SearchInput
          value={search}
          onChangeText={(text) => {
            setSearch(text);
            searchPosts(text);
          }}
          placeholder="Pesquise seu post"
        />
      </S.Search>

      <S.PostsContainer>
        <S.PostsTitle>Posts Recentes</S.PostsTitle>
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            let current: SwipeableMethods | null = null;

            return userData.role === "Professor" ? (
              <ReanimatedSwipeable
                ref={(swipeable) => (current = swipeable)}
                containerStyle={{ borderRadius: 5 }}
                overshootFriction={150}
                onSwipeableWillOpen={(direction) =>
                  onSwipeableWillOpen(direction, current)
                }
                renderRightActions={() => (
                  <S.RightActions>
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
                  </S.RightActions>
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
          ListEmptyComponent={() => (
            <S.EmptyPost>Nenhum post encontrado</S.EmptyPost>
          )}
        />
      </S.PostsContainer>

      {userData.role === "Professor" && (
        <S.ButtonNewPost onPress={() => {
          setNewPost({ title: "", content: "", author: "" })
          setModalVisible(true)
          }}>
          <S.ButtonTextCreatePost
            style={{
              textShadowColor: "rgba(255, 255, 255, 0.5)",
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 2,
            }}
          >
            Criar um post +
          </S.ButtonTextCreatePost>
        </S.ButtonNewPost>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <S.ModalContainer>
          <S.ModalContent>
            <S.ContainerHeaderModal>
              <S.ModalTitle>Criar um Post</S.ModalTitle>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{ position: "absolute", left: 180 }}
              >
                <AntDesign name="close" size={20} color="black" />
              </TouchableOpacity>
            </S.ContainerHeaderModal>
            <S.Input
              placeholder="Título do Post"
              value={newPost.title}
              onChangeText={(text) => setNewPost({ ...newPost, title: text })}
            />
            <S.Input
              placeholder="Conteúdo do Post"
              value={newPost.content}
              onChangeText={(text) => setNewPost({ ...newPost, content: text })}
              multiline
            />
            <S.Input
              placeholder="Nome do Autor"
              value={newPost.author}
              onChangeText={(text) => setNewPost({ ...newPost, author: text })}
            />
            <S.ButtonModal onPress={createPost}>
              <S.ButtonText>Criar Post</S.ButtonText>
            </S.ButtonModal>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <S.ButtonText>Cancelar</S.ButtonText>
            </TouchableOpacity>
          </S.ModalContent>
        </S.ModalContainer>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <S.ModalContainer>
          <S.ModalContent>
            <S.ContainerHeaderModal>
              <S.ModalTitle>Editar Post</S.ModalTitle>
              <TouchableOpacity
                onPress={() => setIsEditModalVisible(false)}
                style={{ position: "absolute", left: 160 }}
              >
                <AntDesign name="close" size={20} color="black" />
              </TouchableOpacity>
            </S.ContainerHeaderModal>
            <S.Input
              placeholder="Título do Post"
              value={newPost.title}
              onChangeText={(text) => setNewPost({ ...newPost, title: text })}
            />
            <S.Input
              placeholder="Conteúdo do Post"
              value={newPost.content}
              onChangeText={(text) => setNewPost({ ...newPost, content: text })}
              multiline
            />
            <S.Input
              placeholder="Nome do Autor"
              value={newPost.author}
              onChangeText={(text) => setNewPost({ ...newPost, author: text })}
            />
            <S.ButtonModal onPress={editPost}>
              <S.ButtonText>Salvar Alterações</S.ButtonText>
            </S.ButtonModal>
            <TouchableOpacity onPress={() => setIsEditModalVisible(false)}>
              <S.ButtonText>Cancelar</S.ButtonText>
            </TouchableOpacity>
          </S.ModalContent>
        </S.ModalContainer>
      </Modal>
    </S.Container>
  );
}
