import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import RootNavigator from './RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

const App: React.FC = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 2 }, mutations: {} },
  });
  
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <RootNavigator />
        <Toast />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;