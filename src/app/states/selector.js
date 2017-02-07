import React from 'react';
import States from './states';
import Select from 'react-select';

class StateSelector extends React.Component {
  constructor() {
    super();

    if (navigator.hasOwnProperty('geolocation')) {
      navigator
        .geolocation
        .getCurrentPosition(onCurrentPosition.bind(this));
    }

    function onCurrentPosition(position) {
      const coords = position.coords;
      const latlng = `${coords.latitude},${coords.longitude}`;
      fetch(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}`)
        .then(response => response.json())
        .then(({results: items}) => items[0].address_components)
        .then(fn.bind(this));

      function fn(addressComponents) {
        const component = this;
        addressComponents.forEach(addressComponent => find(addressComponent));

        function find(addressComponent) {
          const addressType = addressComponent.types[0];
          if (addressType === "administrative_area_level_1") {
            component.handleChange({value: addressComponent.short_name});
          }
        }
      }
    }

    this.state = {
      value: 'RJ'
    };

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(option) {
    this.setState({value: option.value});
    if (this.props.handleChange) {
      this
        .props
        .handleChange(option);
    }
  }
  render() {
    return (
      <Select
        value={this.state.value}
        options={States}
        clearable={false}
        onChange={this.handleChange}
        />);
  }
}

StateSelector.propTypes = {
  handleChange: React.PropTypes.func
};

export default StateSelector;
