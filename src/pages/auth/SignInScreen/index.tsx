import { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, Button } from "react-native";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export function SignInScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // https://gist.github.com/Albejr/a38cdeac247ef177986c99629680afb4
    
    async function handleSignIn() {
        if (!email || !password) {
            Alert.alert("Erro", "Por favor, preencha todos os campos");
            return;
        }

        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password);
            console.log("auth: ", auth)
            console.log("email: ", email)
            console.log("password: ", password)
        } catch (error: any) {
            console.error(error);
            Alert.alert("Erro", "Erro ao fazer login. Verifique suas credenciais.");
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
            console.log("auth: ", auth)
            console.log("email: ", email)
            console.log("password: ", password)
        } catch (error: any) {
            console.error(error);
            Alert.alert("Erro", "Erro ao criar conta. Tente novamente.");
        }
    }
    
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Logue com seu email e senha</Text>

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

            <TouchableOpacity 
                style={styles.button}
                onPress={handleSignIn}
            >
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <Button title="Cadastrar" onPress={handleSignUp} />
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
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#007AFF',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
});