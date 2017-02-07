import React from 'react';
import numeral from '../numeral/numeral';

class Slider extends React.Component {
  render() {
    const label = this.props.label ?
      <label>
        <span>
          {this.props.label}
        </span>
        <strong>
          {numeral(this.props.val).format(this.props.format)}
        </strong>
      </label> : '';
    return (
      <div className="slider">
        {label}
        <input
          name={this.props.name}
          type={this.props.type}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          value={this.props.val}
          onChange={this.props.handleChange}
          />
      </div>
    );
  }
}

Slider.propTypes = {
  name: React.PropTypes.string,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  step: React.PropTypes.number,
  val: React.PropTypes.number,
  label: React.PropTypes.string,
  format: React.PropTypes.string,
  handleChange: React.PropTypes.func,
  type: React.PropTypes.oneOf(['number', 'range'])
};

Slider.defaultProps = {
  min: 0,
  max: 0,
  step: 1,
  val: 0,
  label: '',
  format: '',
  type: 'range'
};

export default Slider;
