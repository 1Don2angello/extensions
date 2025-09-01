import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Button, Title } from 'react-native-paper';
import { calcularCredito } from '../utils/calculos';
import { ResultadoSimulacion, TablaAmortizacion } from '../types';
import { getConfiguracionActiva } from '../config/enganches';
import FormularioSimulador from '../components/FormularioSimulador';
import ResultadosSimulacion from '../components/ResultadosSimulacion';
import AdminEnganches from '../components/AdminEnganches';

const SimuladorScreen = () => {
  const [precio, setPrecio] = useState('523320');
  const [enganche, setEnganche] = useState('5');
  const [plazo, setPlazo] = useState('36');
  const [tasaInteres, setTasaInteres] = useState('1.135');
  const [resultados, setResultados] = useState<ResultadoSimulacion | null>(null);
  const [tablaAmortizacion, setTablaAmortizacion] = useState<TablaAmortizacion[]>([]);
  const [mostrarTabla, setMostrarTabla] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mostrarAdmin, setMostrarAdmin] = useState(false);
  const [configuracionActual, setConfiguracionActual] = useState(getConfiguracionActiva());

  useEffect(() => {
    setEnganche(configuracionActual.default.toString());
  }, [configuracionActual]);

  const handleCalcular = () => {
    setLoading(true);
    try {
      const precioNum = parseFloat(precio);
      const engancheNum = parseFloat(enganche);
      const plazoNum = parseInt(plazo);
      const tasaNum = parseFloat(tasaInteres);

      if (isNaN(precioNum) || isNaN(engancheNum) || isNaN(plazoNum) || isNaN(tasaNum)) {
        Alert.alert('Error', 'Por favor ingresa valores válidos');
        return;
      }

      const { resultado, tabla } = calcularCredito(precioNum, engancheNum, plazoNum, tasaNum);
      setResultados(resultado);
      setTablaAmortizacion(tabla);
      setMostrarTabla(false);
      
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfigChange = () => {
    setConfiguracionActual(getConfiguracionActiva());
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Title style={styles.title}>Simulador de Crédito</Title>
          <Text style={styles.subtitle}>Ciudad Maderas - Terrenos Premium</Text>
          
          <Button 
            mode="outlined" 
            onPress={() => setMostrarAdmin(true)}
            style={styles.adminButton}
          >
            Configurar Enganches
          </Button>
        </View>

        <FormularioSimulador
          precio={precio}
          setPrecio={setPrecio}
          enganche={enganche}
          setEnganche={setEnganche}
          plazo={plazo}
          setPlazo={setPlazo}
          tasaInteres={tasaInteres}
          setTasaInteres={setTasaInteres}
          onCalcular={handleCalcular}
          loading={loading}
          configuracionActual={configuracionActual}
        />

        <ResultadosSimulacion
          resultados={resultados}
          tablaAmortizacion={tablaAmortizacion}
          mostrarTabla={mostrarTabla}
          setMostrarTabla={setMostrarTabla}
        />

        <AdminEnganches 
          visible={mostrarAdmin} 
          onClose={() => setMostrarAdmin(false)}
          onConfigChange={handleConfigChange}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 5,
    marginBottom: 15,
  },
  adminButton: {
    marginTop: 10,
  }
});

export default SimuladorScreen;