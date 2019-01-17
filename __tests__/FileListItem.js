import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import FileListItem from '../src/FileListItem';

const props = {
  avatar: 'someUrl',
  position: {
    lng: 12.12,
    lat: 12.13,
  },
  name: 'fileName.jpg',
  size: 12353,
  type: '.jpg',
  index: 0,
  removeImage: jest.fn(),
};

describe('<FileListItem/> component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<FileListItem {...props} />);
  });
  test('should be defined', () => {
    expect(wrapper).toBeDefined();
  });
  test('should match snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  test('should call removeImage', () => {
    wrapper.find('WithStyles(IconButton)').simulate('click');
    expect(props.removeImage).toHaveBeenCalledWith(0);
  });
});
