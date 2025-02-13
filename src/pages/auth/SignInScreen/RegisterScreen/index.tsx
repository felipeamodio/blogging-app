import { useState } from "react";
import { Alert } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import * as S from "./styles";
import { Toast } from "../../../../components/Toast";

interface RegisterScreenParams {
    role: "Professor" | "Aluno";
  }

export function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const { goBack } = useNavigation();
  const route = useRoute<RouteProp<{ RegisterScreen: RegisterScreenParams }>>();
  const { role } = route.params;

  // https://gist.github.com/Albejr/a38cdeac247ef177986c99629680afb4

  async function handleSignUp() {
    if (!email || !password || (role === "Professor" && !registerNumber)) {
      Toast.error("Por favor, preencha todos os campos");
      return;
    }

    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      Toast.success("Sua conta como foi criada com sucesso!");
      console.log("auth: ", auth);
      console.log("email: ", email);
      console.log("password: ", password);
      if (role === "Professor") {
        console.log("Matrícula: ", registerNumber);
      }
    } catch (error: any) {
      console.error(error);
      Toast.error("Erro ao criar conta. Tente novamente.");
    }
  }

  return (
    <S.Container>
      <S.Title>
        Cadastre-se como {role === "Professor" ? "Professor" : "Aluno"}
      </S.Title>

      <S.Input
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <S.Input
        placeholder="Digite sua senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {role === "Professor" && (
        <S.Input
          placeholder="Digite seu código de matrícula"
          value={registerNumber}
          onChangeText={setRegisterNumber}
        />
      )}

      <S.Button onPress={handleSignUp}>
        <S.ButtonText>Cadastrar</S.ButtonText>
      </S.Button>
    </S.Container>
  );
}
