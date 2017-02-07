/* eslint-env jasmine */
import React from 'react';
import TestUtils from 'react-dom/lib/ReactTestUtils';
import Chart from './chart';

describe('chart component', () => {
  it('should render 90% rent and 10% buy', () => {
    percentage(100, 10);
    percentage(200, 20);
  });

  it('should render 50% rent and 50% buy', () => {
    percentage(50, 50);
  });

  function percentage(rent, buy) {
    const bigger = rent >= buy ? 'rent' : 'buy';
    const smaller = rent < buy ? 'rent' : 'buy';
    const percentage = (smaller === 'rent' ? rent : buy) / (rent + buy) * 100;

    const chart = TestUtils.renderIntoDocument(<Chart rentSum={rent} buySum={buy}/>);

    const percentages = chart.getPercentages();

    expect(percentages[bigger] === 100 - percentage).toBe(true);
    expect(percentages[smaller] === percentage).toBe(true);
  }
});
