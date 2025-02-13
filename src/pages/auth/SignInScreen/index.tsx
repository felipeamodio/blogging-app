import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  Button,
  Modal,
} from "react-native";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { toast } from "@backpackapp-io/react-native-toast";
import { Toast } from "../../../components/Toast";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as S from "./styles"

export function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const { navigate } = useNavigation();

  // https://gist.github.com/Albejr/a38cdeac247ef177986c99629680afb4

  async function handleSignIn() {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      console.log("auth: ", auth);
      console.log("email: ", email);
      console.log("password: ", password);
      Toast.success("Login realizado com sucesso");
    } catch (error: any) {
      console.error(error);
      Toast.error("Erro ao fazer login. Verifique suas credenciais.");
    }
  }

  async function handleSignUp() {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Sucesso", "Conta criada com sucesso!");
      console.log("auth: ", auth);
      console.log("email: ", email);
      console.log("password: ", password);
    } catch (error: any) {
      console.error(error);
      toast.error("Erro ao criar conta. Tente novamente.", {});
    }
  }

  function navigateToFormRegister(role: "Professor" | "Aluno"){
      setModalVisible(false)
      navigate("RegisterScreen", {role})
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logue com seu email e senha</Text>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal vai ser fechado");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{position: "absolute", right: 20, top: 20, zIndex: 1}}>
              <AntDesign name="close" size={24} color="gray" />
            </TouchableOpacity>
            <S.TitleModal>Como você quer realizar{'\n'}seu cadastro?</S.TitleModal>

            <S.ContainerOptions>
                <S.ContainerButtonOptions onPress={() => navigateToFormRegister("Professor")}>
                    <S.ButtonOptionsText>Professor</S.ButtonOptionsText>
                </S.ContainerButtonOptions>

                <S.ContainerButtonOptions onPress={() => navigateToFormRegister("Aluno")}>
                    <S.ButtonOptionsText>Aluno</S.ButtonOptionsText>
                </S.ContainerButtonOptions>
            </S.ContainerOptions>
          </View>
        </View>
      </Modal>

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <Button title="Cadastre-se" onPress={() => setModalVisible(true)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    width: "80%",
    height: "40%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
