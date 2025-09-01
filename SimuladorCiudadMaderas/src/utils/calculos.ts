import { ResultadoSimulacion, TablaAmortizacion } from '../types';

export const calcularCredito = (
  precio: number,
  enganchePorcentaje: number,
  plazoMeses: number,
  tasaInteresAnual: number
): { resultado: ResultadoSimulacion; tabla: TablaAmortizacion[] } => {
  // Validaciones
  if (enganchePorcentaje < 0 || enganchePorcentaje > 100) {
    throw new Error('El enganche debe ser entre 0% y 100%');
  }

  const engancheMonto = precio * (enganchePorcentaje / 100);
  const montoFinanciar = precio - engancheMonto;
  const tasaMensual = tasaInteresAnual / 100 / 12;
  
  let pagoMensual = 0;
  if (tasaMensual > 0) {
    pagoMensual = montoFinanciar * (tasaMensual * Math.pow(1 + tasaMensual, plazoMeses)) / 
                  (Math.pow(1 + tasaMensual, plazoMeses) - 1);
  } else {
    pagoMensual = montoFinanciar / plazoMeses;
  }

  // Generar tabla de amortización
  let saldo = montoFinanciar;
  const tabla: TablaAmortizacion[] = [];
  
  for (let i = 1; i <= plazoMeses; i++) {
    const interes = saldo * tasaMensual;
    const capital = pagoMensual - interes;
    saldo -= capital;
    
    // Evitar saldos negativos por redondeo
    if (saldo < 0) saldo = 0;
    
    tabla.push({
      mes: i,
      pago: pagoMensual,
      interes,
      capital,
      saldo
    });
  }

  const totalIntereses = pagoMensual * plazoMeses - montoFinanciar;
  const totalPagado = pagoMensual * plazoMeses + engancheMonto;

  return {
    resultado: {
      pagoMensual,
      montoFinanciar,
      engancheMonto,
      totalIntereses,
      totalPagado
    },
    tabla
  };
};

export const formatearMoneda = (valor: number): string => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(valor);
};