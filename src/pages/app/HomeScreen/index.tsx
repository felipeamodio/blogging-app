import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from "react-native";
import { deleteUser, getAuth, signOut } from "firebase/auth";

export function HomeScreen(){
    const auth = getAuth();
    const currentUser = auth.currentUser;

    async function handleSignOut() {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleDeleteAccount() {
        if (!currentUser) return;

        Alert.alert(
            "Deletar Conta",
            "Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita.",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Sim, deletar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteUser(currentUser);
                            console.log("currentUser: ", currentUser)
                            Alert.alert("Sucesso", "Sua conta foi deletada com sucesso.");
                        } catch (error) {
                            console.error(error);
                            Alert.alert("Erro", "Erro ao deletar conta. Tente fazer login novamente.");
                        }
                    }
                }
            ]
        );
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Você está na Home</Text>
            
            <TouchableOpacity 
                style={styles.button}
                onPress={handleSignOut}
            >
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>

            <Button title="Deletar conta" onPress={handleDeleteAccount} color="red" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20
    },
    title: {
        fontSize: 20,
        marginBottom: 20
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#FF3B30',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
});