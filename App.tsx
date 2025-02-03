import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { HomeScreen } from './src/pages/app/HomeScreen';
import { SignInScreen } from './src/pages/auth/SignInScreen';
import './firebaseConfig';

// Inicialize o Firebase Auth
const auth = getAuth();

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Monitora o estado de autenticação
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup da inscrição quando o componente for desmontado
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <>
      {user ? <HomeScreen /> : <SignInScreen />}
      <StatusBar style="auto" />
    </>
  );
}