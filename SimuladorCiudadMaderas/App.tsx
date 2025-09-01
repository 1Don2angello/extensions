import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import SimuladorScreen from './src/screens/SimuladorScreen';

export default function App() {
  return (
    <PaperProvider>
      <SimuladorScreen />
    </PaperProvider>
  );
}