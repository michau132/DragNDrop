import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import DropZone from '../src/DropZone';

const props = {
  submitFile: jest.fn(),
};

describe('<DropZone /> component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<DropZone {...props} />);
  });
  test('should be defined', () => {
    expect(wrapper).toBeDefined();
  });

  test('should match snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('should call submitFile on drop event', () => {
    const prevents = { preventDefault: () => {}, stopPropagation: () => {}, dataTransfer: { files: { name: 'someFile' } } };
    wrapper.simulate('drop', prevents);
    expect(props.submitFile).toHaveBeenCalled();
  });
});
