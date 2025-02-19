import { useState } from "react";
import { Text, TouchableOpacity, Alert, Button, Modal } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { Toast } from "../../../components/Toast";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as S from "./styles";

export function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const { navigate } = useNavigation();

  async function handleSignIn() {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      Toast.success("Login realizado com sucesso");
    } catch (error: any) {
      console.error(error);
      Toast.error("Erro ao fazer login. Verifique suas credenciais.");
    }
  }

  function navigateToFormRegister(role: "Professor" | "Aluno") {
    setModalVisible(false);
    navigate("RegisterScreen", { role });
  }

  return (
    <S.Container>
      <S.Title>
        Bem-vindo(a) ao{" "}
        <Text style={{ fontWeight: "bold", color: "#007AFF" }}>
          Blogging App
        </Text>
      </S.Title>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal vai ser fechado");
          setModalVisible(!modalVisible);
        }}
      >
        <S.CenteredView>
          <S.ModalView>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={{ position: "absolute", right: 20, top: 20, zIndex: 1 }}
            >
              <AntDesign name="close" size={24} color="gray" />
            </TouchableOpacity>
            <S.TitleModal>
              Como você quer realizar{"\n"}seu cadastro?
            </S.TitleModal>

            <S.ContainerOptions>
              <S.ContainerButtonOptions
                onPress={() => navigateToFormRegister("Professor")}
              >
                <S.ButtonOptionsText>Professor</S.ButtonOptionsText>
              </S.ContainerButtonOptions>

              <S.ContainerButtonOptions
                onPress={() => navigateToFormRegister("Aluno")}
              >
                <S.ButtonOptionsText>Aluno</S.ButtonOptionsText>
              </S.ContainerButtonOptions>
            </S.ContainerOptions>
          </S.ModalView>
        </S.CenteredView>
      </Modal>

      <S.Input
        placeholder="Digite seu e-mail"
        placeholderTextColor="#A9A9A9"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <S.Input
        placeholder="Digite sua senha"
        placeholderTextColor="#A9A9A9"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <S.Button onPress={handleSignIn}>
        <S.ButtonText>Entrar</S.ButtonText>
      </S.Button>

      <Button title="Cadastre-se" onPress={() => setModalVisible(true)} />
    </S.Container>
  );
}
