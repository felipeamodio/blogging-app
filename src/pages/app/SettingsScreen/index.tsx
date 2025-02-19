import { getAuth, deleteUser, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Alert, Button, Text, TouchableOpacity, View } from "react-native";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import * as S from "./styles";

export function SettingsScreen() {
  const auth = getAuth();
  const [userData, setUserData] = useState<{ role?: string }>({});
  const currentUser = auth.currentUser;

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

  async function handleSignOut() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <S.Container>
      <S.ContainerButton onPress={handleSignOut}>
        <S.SignOut>Sair</S.SignOut>
      </S.ContainerButton>

      <Button title="Deletar conta" onPress={handleDeleteAccount} color="red" />
    </S.Container>
  );
}
