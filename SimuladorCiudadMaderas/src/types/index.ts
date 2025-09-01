export interface ResultadoSimulacion {
  engancheMonto: number;
  montoFinanciar: number;
  pagoMensual: number;
  totalIntereses: number;
  totalPagado: number;
}

export interface TablaAmortizacion {
  mes: number;
  pago: number;
  interes: number;
  capital: number;
  saldo: number;
}

export interface ConfiguracionEnganche {
  id: string;
  nombre: string;
  enganchesPermitidos: number[];
  default: number;
  activa: boolean;
}

export interface PagoPorAnio {
  anio: number;
  mensualidad: number;
  meses: number;
  totalAnual: number;
}