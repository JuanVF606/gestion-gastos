const categorias = [
  { value: 'alimentacion', label: 'Alimentación' },
  { value: 'transporte', label: 'Transporte' },
  { value: 'entretenimiento', label: 'Entretenimiento' },
  { value: 'vivienda', label: 'Vivienda' },
  { value: 'salud', label: 'Salud' }
];

const tiposGasto = {
  alimentacion: [
      { value: 'supermercado', label: 'Supermercado' },
      { value: 'restaurante', label: 'Restaurante' }
  ],
  transporte: [
      { value: 'combustible', label: 'Combustible' },
      { value: 'transporte_publico', label: 'Transporte Público' }
  ],
  entretenimiento: [
      { value: 'cine', label: 'Cine' },
      { value: 'suscripciones', label: 'Suscripciones' }
  ],
  vivienda: [
      { value: 'alquiler', label: 'Alquiler' },
      { value: 'servicios', label: 'Servicios' }
  ],
  salud: [
      { value: 'medicamentos', label: 'Medicamentos' },
      { value: 'consultas', label: 'Consultas Médicas' }
  ]
};

export { categorias, tiposGasto };