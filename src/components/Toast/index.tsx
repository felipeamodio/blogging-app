// src/components/CustomToast.ts
import { toast, ToastOptions } from '@backpackapp-io/react-native-toast';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

type ToastType = 'success' | 'error';

const toastConfig: Record<ToastType, ToastOptions> = {
  success: {
    styles: {
      view: {
        backgroundColor: '#00C851',
        borderRadius: 8,
      },
      text: {
        color: '#ffffff',
        fontSize: 14
      },
    },
    icon: <AntDesign name="checkcircleo" size={20} color="#ffffff" style={{marginRight: 10}} />
  },
  error: {
    styles: {
      view: {
        backgroundColor: '#ff4444',
        borderRadius: 8,
      },
      text: {
        color: '#ffffff',
        fontSize: 14
      },
    },
    icon: <MaterialIcons name="error-outline" size={20} color="#ffffff" style={{marginRight: 10}} />
  }
};

export const Toast = {
  success: (message: string, options?: ToastOptions) => {
    toast.success(message, { ...toastConfig.success, ...options });
  },
  error: (message: string, options?: ToastOptions) => {
    toast.error(message, { ...toastConfig.error, ...options });
  },
};