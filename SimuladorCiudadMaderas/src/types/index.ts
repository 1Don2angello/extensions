export interface ResultadoSimulacion {
  pagoMensual: number;
  montoFinanciar: number;
  engancheMonto: number;
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