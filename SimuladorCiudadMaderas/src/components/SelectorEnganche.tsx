import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { ConfiguracionEnganche } from '../config/enganches';

interface Props {
  configuracion: ConfiguracionEnganche;
  valor: string;
  onChange: (valor: string) => void;
}

const SelectorEnganche: React.FC<Props> = ({ configuracion, valor, onChange }) => {
  const botones = configuracion.enganchesPermitidos.map(enganche => ({
    value: enganche.toString(),
    label: `${enganche}%`,
    style: styles.boton
  }));

  return (
    <View style={styles.container}>
      <SegmentedButtons
        value={valor}
        onValueChange={onChange}
        buttons={botones}
        style={styles.segmentedButtons}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  segmentedButtons: {
    justifyContent: 'center',
  },
  boton: {
    minWidth: 50,
  }
});

export default SelectorEnganche;