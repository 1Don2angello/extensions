import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { TextInput, Button, Card, DataTable, Title } from 'react-native-paper';
import { calcularCredito, formatearMoneda } from '../utils/calculos';
import { ResultadoSimulacion, TablaAmortizacion } from '../types';

const SimuladorScreen = () => {
  const [precio, setPrecio] = useState('523320');
  const [enganche, setEnganche] = useState('0');
  const [plazo, setPlazo] = useState('36');
  const [tasaInteres, setTasaInteres] = useState('1.135');
  const [resultados, setResultados] = useState<ResultadoSimulacion | null>(null);
  const [tablaAmortizacion, setTablaAmortizacion] = useState<TablaAmortizacion[]>([]);
  const [mostrarTabla, setMostrarTabla] = useState(false);
  const [loading, setLoading] = useState(false);

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

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* HEADER */}
        <View style={styles.header}>
          <Title style={styles.title}>Simulador de Crédito</Title>
          <Text style={styles.subtitle}>Ciudad Maderas - Terrenos Premium</Text>
        </View>

        {/* FORMULARIO */}
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
            
            <TextInput
              label="Enganche (%)"
              keyboardType="numeric"
              value={enganche}
              onChangeText={setEnganche}
              style={styles.input}
              mode="outlined"
              left={<TextInput.Affix text="%" />}
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
              onPress={handleCalcular}
              style={styles.button}
              loading={loading}
              disabled={loading}
            >
              Calcular Crédito
            </Button>
          </Card.Content>
        </Card>

        {/* RESULTADOS */}
        {resultados && (
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.resultTitle}>Resultados del cálculo</Title>
              
              <DataTable>
                <DataTable.Row>
                  <DataTable.Cell>Enganche:</DataTable.Cell>
                  <DataTable.Cell numeric>{formatearMoneda(resultados.engancheMonto)}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Monto a financiar:</DataTable.Cell>
                  <DataTable.Cell numeric>{formatearMoneda(resultados.montoFinanciar)}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Pago mensual:</DataTable.Cell>
                  <DataTable.Cell numeric>{formatearMoneda(resultados.pagoMensual)}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Total de intereses:</DataTable.Cell>
                  <DataTable.Cell numeric>{formatearMoneda(resultados.totalIntereses)}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Total a pagar:</DataTable.Cell>
                  <DataTable.Cell numeric>{formatearMoneda(resultados.totalPagado)}</DataTable.Cell>
                </DataTable.Row>
              </DataTable>
              
              <Button 
                mode="outlined" 
                onPress={() => setMostrarTabla(!mostrarTabla)}
                style={styles.tableButton}
                icon={mostrarTabla ? 'eye-off' : 'eye'}
              >
                {mostrarTabla ? 'Ocultar tabla' : 'Ver tabla de amortización'}
              </Button>
            </Card.Content>
          </Card>
        )}

        {/* TABLA DE AMORTIZACIÓN */}
        {mostrarTabla && tablaAmortizacion.length > 0 && (
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.resultTitle}>Tabla de Amortización (primeros 12 meses)</Title>
              <ScrollView horizontal>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>Mes</DataTable.Title>
                    <DataTable.Title numeric>Pago</DataTable.Title>
                    <DataTable.Title numeric>Interés</DataTable.Title>
                    <DataTable.Title numeric>Capital</DataTable.Title>
                    <DataTable.Title numeric>Saldo</DataTable.Title>
                  </DataTable.Header>
                  
                  {tablaAmortizacion.slice(0, 12).map((fila, index) => (
                    <DataTable.Row key={index}>
                      <DataTable.Cell>{fila.mes}</DataTable.Cell>
                      <DataTable.Cell numeric>{formatearMoneda(fila.pago)}</DataTable.Cell>
                      <DataTable.Cell numeric>{formatearMoneda(fila.interes)}</DataTable.Cell>
                      <DataTable.Cell numeric>{formatearMoneda(fila.capital)}</DataTable.Cell>
                      <DataTable.Cell numeric>{formatearMoneda(fila.saldo)}</DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable>
              </ScrollView>
            </Card.Content>
          </Card>
        )}
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
  },
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
  },
  resultTitle: {
    fontSize: 18,
    marginBottom: 16,
    color: '#2c3e50',
  },
  tableButton: {
    marginTop: 16,
    borderColor: '#3498db',
  },
});

export default SimuladorScreen;