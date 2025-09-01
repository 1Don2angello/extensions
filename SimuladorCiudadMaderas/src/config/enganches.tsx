export interface ConfiguracionEnganche {
  id: string;
  nombre: string;
  enganchesPermitidos: number[];
  default: number;
  activa: boolean;
}

export const configuracionDefault: ConfiguracionEnganche = {
  id: 'default',
  nombre: 'Configuración Standard',
  enganchesPermitidos: [1, 5, 10],
  default: 5,
  activa: true
};

export let configuraciones: ConfiguracionEnganche[] = [configuracionDefault];

export const guardarConfiguraciones = (nuevasConfigs: ConfiguracionEnganche[]) => {
  configuraciones = nuevasConfigs;
};

export const getConfiguracionActiva = (): ConfiguracionEnganche => {
  return configuraciones.find(config => config.activa) || configuracionDefault;
};