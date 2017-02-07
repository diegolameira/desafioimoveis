import numeral from 'numeral';

// load a locale
numeral.register('locale', 'br', {
  delimiters: {
    thousands: '.',
    decimal: ','
  },
  currency: {
    symbol: 'R$'
  }
});

numeral.locale('br');

numeral.currencyFormat = '$0,0.';

export default numeral;
