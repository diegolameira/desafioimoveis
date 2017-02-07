import React, {Component} from 'react';
import interest from 'interestjs';

import Chart from './chart/chart';
import Slider from './sliders/slider';
import sliders from './sliders/sliders';
import StateSelector from './states/selector';

export class App extends Component {
  constructor() {
    super();

    this.sliders = sliders;

    const fun = slider => ({
      [slider.name]: Number(parseFloat(slider.default).toFixed(1))
    });
    const defaultState = Object.assign(...this.sliders.map(fun));

    this.state = defaultState;

    this.onSelectLocal = this.onSelectLocal.bind(this);
    this.sliderUpdate = this.sliderUpdate.bind(this);
    this.updateChart = this.updateChart.bind(this);
    this.fetchValores = fetch('https://raw.githubusercontent.com/diegolameira/desafioimoveis/master/api/valores.json')
      .then(response => response.json());
  }
  onSelectLocal(state) {
    this.fetchValores
      .then(valores => this.setState({
        rent: Number(valores[state.value].aluguel),
        buy: Number(valores[state.value].compra)
      }));

    this.updateChart();
  }
  sliderUpdate(e) {
    const target = e.target;

    this.setState({
      [target.name]: Number(target.value)
    });

    this.updateChart();
  }
  updateChart() {
    this.setState(prevState => {
      const months = 12 * prevState.years;
      return {
        rentSum: prevState.rent * months,
        buySum: interest(prevState.buy / months, months, prevState.tax).sum
      };
    });
  }
  componentWillMount() {
    this.updateChart();
  }
  render() {
    return (
      <div>

        <div className="row">
          <div className="column-100">

            <header className="header">
              <h1>Comprar ou Alugar?</h1>

              <div>
                <label>
                  Selecione seu estado
                  <StateSelector
                    handleChange={this.onSelectLocal}
                    />
                </label>
              </div>

            </header>

          </div>
        </div>

        <div className="row">

          <div className="column-50 total-costs">
            <h2>Custo total</h2>
            <Chart
              rentSum={this.state.rentSum}
              buySum={this.state.buySum}
              />
          </div>

          <div className="column-50 sliders">
            {
              this
                .sliders
                .map(slider => <Slider
                  key={slider.name}
                  name={slider.name}
                  min={Number(slider.min)}
                  max={Number(slider.max)}
                  step={Number(slider.step)}
                  val={Number(this.state[slider.name])}
                  label={slider.label}
                  format={slider.format}
                  handleChange={this.sliderUpdate}
                  />
                  )
              }
          </div>

        </div>

      </div>
    );
  }
}
