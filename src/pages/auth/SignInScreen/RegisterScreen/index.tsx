import { useState } from "react";
import { Alert } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import * as S from "./styles";
import { Toast } from "../../../../components/Toast";
import {getFirestore, doc, setDoc} from "firebase/firestore"

interface RegisterScreenParams {
    role: "Professor" | "Aluno";
  }

export function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const { goBack } = useNavigation();
  const route = useRoute<RouteProp<{ RegisterScreen: RegisterScreenParams }>>();
  const { role } = route.params;

  // https://gist.github.com/Albejr/a38cdeac247ef177986c99629680afb4

  async function handleSignUp() {
    if (!email || !password || !confirmPassword || (role === "Professor" && !registerNumber)) {
      Toast.error("Por favor, preencha todos os campos");
      return;
    }
  
    if (password !== confirmPassword) {
      Toast.error("As senhas não coincidem");
      return;
    }
  
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      const db = getFirestore();
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email,
        role,
        ...(role === "Professor" && {registerNumber}),
        createdAt: new Date()
      })

      Toast.success("Sua conta foi criada com sucesso!");
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
        placeholderTextColor="#A9A9A9"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {role === "Professor" && (
        <S.Input
          placeholder="Digite seu código de matrícula"
          placeholderTextColor="#A9A9A9"
          value={registerNumber}
          onChangeText={setRegisterNumber}
        />
      )}

      <S.Input
        placeholder="Crie sua senha"
        placeholderTextColor="#A9A9A9"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <S.Input
        placeholder="Confirme sua senha"
        placeholderTextColor="#A9A9A9"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      

      <S.Button onPress={handleSignUp}>
        <S.ButtonText>Cadastrar</S.ButtonText>
      </S.Button>
    </S.Container>
  );
}
