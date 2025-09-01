import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button, TextInput, Card, Switch, List, Text } from 'react-native-paper';
import { ConfiguracionEnganche, guardarConfiguraciones, configuraciones } from '../config/enganches';

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfigChange: () => void;
}

const AdminEnganches: React.FC<Props> = ({ visible, onClose, onConfigChange }) => {
  const [configs, setConfigs] = useState<ConfiguracionEnganche[]>(configuraciones);
  const [nuevaConfig, setNuevaConfig] = useState<Partial<ConfiguracionEnganche>>({
    nombre: '',
    enganchesPermitidos: [1, 5, 10],
    default: 5
  });

  const agregarEnganche = (valor: number) => {
    if (!nuevaConfig.enganchesPermitidos?.includes(valor)) {
      setNuevaConfig({
        ...nuevaConfig,
        enganchesPermitidos: [...(nuevaConfig.enganchesPermitidos || []), valor]
      });
    }
  };

  const removerEnganche = (valor: number) => {
    setNuevaConfig({
      ...nuevaConfig,
      enganchesPermitidos: nuevaConfig.enganchesPermitidos?.filter(v => v !== valor) || []
    });
  };

  const guardarConfiguracion = () => {
    if (nuevaConfig.nombre && nuevaConfig.enganchesPermitidos) {
      const nuevaConfigCompleta: ConfiguracionEnganche = {
        id: Date.now().toString(),
        nombre: nuevaConfig.nombre,
        enganchesPermitidos: nuevaConfig.enganchesPermitidos,
        default: nuevaConfig.default || 5,
        activa: false
      };

      const nuevasConfigs = [...configs, nuevaConfigCompleta];
      setConfigs(nuevasConfigs);
      guardarConfiguraciones(nuevasConfigs);
      setNuevaConfig({ nombre: '', enganchesPermitidos: [1, 5, 10], default: 5 });
      onConfigChange();
    }
  };

  const activarConfiguracion = (id: string) => {
    const nuevasConfigs = configs.map(config => ({
      ...config,
      activa: config.id === id
    }));
    setConfigs(nuevasConfigs);
    guardarConfiguraciones(nuevasConfigs);
    onConfigChange();
  };

  if (!visible) return null;

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Title title="Administrar Enganches" />
        <Card.Content>
          <Text variant="titleMedium">Configuración Activa:</Text>
          {configs.filter(c => c.activa).map(config => (
            <Text key={config.id} variant="bodyMedium">
              {config.nombre}: {config.enganchesPermitidos.join('%, ')}%
            </Text>
          ))}

          <Text variant="titleMedium" style={styles.sectionTitle}>Todas las configuraciones:</Text>
          {configs.map(config => (
            <List.Item
              key={config.id}
              title={config.nombre}
              description={`Enganches: ${config.enganchesPermitidos.join('%, ')}%`}
              right={() => (
                <Switch
                  value={config.activa}
                  onValueChange={() => activarConfiguracion(config.id)}
                />
              )}
            />
          ))}

          <Text variant="titleMedium" style={styles.sectionTitle}>Crear nueva configuración:</Text>
          <TextInput
            label="Nombre de la configuración"
            value={nuevaConfig.nombre || ''}
            onChangeText={(text) => setNuevaConfig({...nuevaConfig, nombre: text})}
            style={styles.input}
          />

          <Text variant="bodyMedium">Enganches permitidos:</Text>
          <View style={styles.enganchesContainer}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(valor => (
              <Button
                key={valor}
                mode={nuevaConfig.enganchesPermitidos?.includes(valor) ? "contained" : "outlined"}
                onPress={() => 
                  nuevaConfig.enganchesPermitidos?.includes(valor) 
                    ? removerEnganche(valor) 
                    : agregarEnganche(valor)
                }
                style={styles.botonEnganche}
              >
                {valor}%
              </Button>
            ))}
          </View>

          <Button mode="contained" onPress={guardarConfiguracion} style={styles.botonGuardar}>
            Guardar Configuración
          </Button>

          <Button mode="outlined" onPress={onClose} style={styles.botonCerrar}>
            Cerrar
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    marginBottom: 15,
  },
  enganchesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
    gap: 8,
  },
  botonEnganche: {
    margin: 2,
  },
  botonGuardar: {
    marginTop: 20,
    marginBottom: 10,
  },
  botonCerrar: {
    marginBottom: 20,
  }
});

export default AdminEnganches;