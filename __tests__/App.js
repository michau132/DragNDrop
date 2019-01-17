import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from '../src/App';


describe('<App/>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });
  test('should be defined', () => {
    expect(wrapper).toBeDefined();
  });

  test('should match snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('should update state', () => {
    wrapper.instance().updateImages({ avatar: 'dd', pos: { lng: 12.12, lat: 12.13 } });
    expect(wrapper.state().images[0]).toEqual({ avatar: 'dd', pos: { lng: 12.12, lat: 12.13 } });

    wrapper.instance().removeImage(0);
    expect(wrapper.state().images).toEqual([]);
  });
});
