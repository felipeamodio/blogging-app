import { StatusBar } from 'expo-status-bar';
import './firebaseConfig';
import { Routes } from './src/routes';
import { Toasts } from '@backpackapp-io/react-native-toast';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

  if (__DEV__) {
    require("./ReactotronConfig");
  }
export default function App() {
  return (
    <>
    <SafeAreaProvider>
    <GestureHandlerRootView>
      <Routes />
      <StatusBar style="auto" />
      <Toasts />
      </GestureHandlerRootView>
      </SafeAreaProvider>
    </>
  );
}