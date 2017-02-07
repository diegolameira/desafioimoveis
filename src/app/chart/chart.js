import React, {Component} from 'react';
import numeral from '../numeral/numeral';

class Chart extends Component {
  constructor() {
    super();

    this.state = {};
    this.getStyles = this.getStyles.bind(this);
    this.getPercentages = this.getPercentages.bind(this);
  }
  getPercentages() {
    const props = this.props;
    const rent = props.rentSum;
    const buy = props.buySum;
    const full = rent + buy;

    const bigger = rent >= buy ? 'rent' : 'buy';
    const smaller = rent < buy ? 'rent' : 'buy';
    const percentage = props[`${smaller}Sum`] / full * 100;

    const percentages = {
      [smaller]: percentage,
      [bigger]: percentage >= 100 ? 0 : 100 - percentage
    };

    return percentages;
  }
  getStyles(prop) {
    const percentage = this.getPercentages()[prop];
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return {
      [w >= 769 ? 'height' : 'width']: `${percentage}%`,
      backgroundColor: percentage < 50 ? '#85D43E' : '#9027B0'
    };
  }
  render() {
    return (
      <div className="chart">

        <div className="rent" style={Object.assign({}, this.getStyles('rent'))}>
          <p>
            Alugar
            <br/>
            <strong>{numeral(this.props.rentSum).format(numeral.currencyFormat)}</strong>
          </p>
        </div>

        <div className="buy" style={Object.assign({}, this.getStyles('buy'))}>
          <p>
            Comprar
            <br/>
            <strong>{numeral(this.props.buySum).format(numeral.currencyFormat)}</strong>
          </p>
        </div>

      </div>
    );
  }
}

Chart.propTypes = {
  rentSum: React.PropTypes.number.isRequired,
  buySum: React.PropTypes.number.isRequired
};

export default Chart;
