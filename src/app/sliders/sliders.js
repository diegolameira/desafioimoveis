export default [
  {
    name: 'rent',
    label: 'Valor do aluguel por mês',
    min: 100,
    max: 10000,
    step: 1,
    default: 3000,
    format: '$0,0.'
  }, {
    name: 'buy',
    label: 'Valor do imóvel para comprar',
    min: 10000,
    max: 2000000,
    step: 1,
    default: 100000,
    format: '$0,0.'
  }, {
    name: 'years',
    label: 'Quanto tempo você irá morar?',
    min: 1,
    max: 30,
    step: 1,
    default: 10,
    format: '00'
  }, {
    name: 'tax',
    label: 'Taxa de juros anual %',
    min: '0.5',
    max: '25.00',
    step: '0.1',
    default: '11.5',
    format: '0.0'
  }
];
