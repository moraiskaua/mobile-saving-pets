import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Main from './src/Main';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast, { ErrorToast, ToastProps } from 'react-native-toast-message';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const toastConfig = {
  success: (props: ToastProps) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#BE4CD0' }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),

  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#BE4CD0' }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <AuthProvider>
          <Main />
          <Toast config={toastConfig} />
        </AuthProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default App;
