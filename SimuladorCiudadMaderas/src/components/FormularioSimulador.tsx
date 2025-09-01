import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import SelectorEnganche from './SelectorEnganche';
import { ConfiguracionEnganche } from '../config/enganches';

interface Props {
  precio: string;
  setPrecio: (value: string) => void;
  enganche: string;
  setEnganche: (value: string) => void;
  plazo: string;
  setPlazo: (value: string) => void;
  tasaInteres: string;
  setTasaInteres: (value: string) => void;
  onCalcular: () => void;
  loading: boolean;
  configuracionActual: ConfiguracionEnganche;
}

const FormularioSimulador: React.FC<Props> = ({
  precio,
  setPrecio,
  enganche,
  setEnganche,
  plazo,
  setPlazo,
  tasaInteres,
  setTasaInteres,
  onCalcular,
  loading,
  configuracionActual
}) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <TextInput
          label="Precio del terreno ($)"
          keyboardType="numeric"
          value={precio}
          onChangeText={setPrecio}
          style={styles.input}
          mode="outlined"
          left={<TextInput.Affix text="$" />}
        />
        
        <SelectorEnganche
          configuracion={configuracionActual}
          valor={enganche}
          onChange={setEnganche}
        />
        
        <TextInput
          label="Plazo (meses)"
          keyboardType="numeric"
          value={plazo}
          onChangeText={setPlazo}
          style={styles.input}
          mode="outlined"
        />
        
        <TextInput
          label="Tasa de interés anual (%)"
          keyboardType="numeric"
          value={tasaInteres}
          onChangeText={setTasaInteres}
          style={styles.input}
          mode="outlined"
          left={<TextInput.Affix text="%" />}
        />
        
        <Button 
          mode="contained" 
          onPress={onCalcular}
          style={styles.button}
          loading={loading}
          disabled={loading}
        >
          Calcular Crédito
        </Button>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 12,
    elevation: 3,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    paddingVertical: 6,
    backgroundColor: '#3498db',
  }
});

export default FormularioSimulador;