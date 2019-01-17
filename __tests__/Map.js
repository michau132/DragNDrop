import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Map from '../src/Map';

const props = {
  images: [
    {
      avatar: 'someUrl',
      position: {
        lng: 12.12,
        lat: 12.13,
      },
      name: 'fileName.jpg',
    },
    {
      avatar: 'secondUrl',
      position: {
        lng: 13,
        lat: 50,
      },
      name: 'DESC414.jpg',
    },
  ],
};

describe('<Map/> component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Map {...props} />);
  });
  test('should be defined', () => {
    expect(wrapper).toBeDefined();
  });
  test('should match snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
