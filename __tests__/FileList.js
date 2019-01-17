import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import FileList from '../src/FileList';

const props = {
  list: [
    {
      avatar: 'someUrl',
      position: {
        lng: 12.12,
        lat: 12.13,
      },
      name: 'fileName.jpg',
      size: 12353,
      type: '.jpg',
    },
    {
      avatar: 'secondUrl',
      position: {
        lng: 13,
        lat: 50,
      },
      name: 'DESC414.jpg',
      size: 8346,
      type: '.jpg',
    },
  ],
  removeImage: jest.fn(),
};

describe('<FileList/> component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<FileList {...props} />);
  });
  test('should be defined', () => {
    expect(wrapper).toBeDefined();
  });
  test('should match snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
