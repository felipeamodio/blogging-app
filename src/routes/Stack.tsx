import { ActivityIndicator, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../pages/app/HomeScreen";
import { SignInScreen } from "../pages/auth/SignInScreen";
import { useEffect, useState } from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { RegisterScreen } from "../pages/auth/SignInScreen/RegisterScreen";
import { TabRoute } from "./Tab";

export type StackParamList = {
    TabRoute: undefined;
    SignInScreen: undefined;
    RegisterScreen: { role: "Professor" | "Aluno" };
}

const Stack = createNativeStackNavigator<StackParamList>();

const auth = getAuth();

export function StackRoute() {
  const [authenticated, setAuthenticated] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setAuthenticated(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Stack.Navigator
        id={undefined}
        screenOptions={{
            headerShown: false,
            fullScreenGestureEnabled: true
        }}
    >
      {authenticated ? (
        <Stack.Group>
          <Stack.Screen name="TabRoute" component={TabRoute} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
