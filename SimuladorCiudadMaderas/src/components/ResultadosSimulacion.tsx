import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Card, DataTable, Title } from 'react-native-paper';
import { ResultadoSimulacion, TablaAmortizacion } from '../types';
import { formatearMoneda } from '../utils/calculos';

interface Props {
  resultados: ResultadoSimulacion | null;
  tablaAmortizacion: TablaAmortizacion[];
  mostrarTabla: boolean;
  setMostrarTabla: (value: boolean) => void;
}

const ResultadosSimulacion: React.FC<Props> = ({
  resultados,
  tablaAmortizacion,
  mostrarTabla,
  setMostrarTabla
}) => {
  if (!resultados) return null;

  return (
    <>
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
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 12,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 18,
    marginBottom: 16,
    color: '#2c3e50',
  },
  tableButton: {
    marginTop: 16,
    borderColor: '#3498db',
  }
});

export default ResultadosSimulacion;
