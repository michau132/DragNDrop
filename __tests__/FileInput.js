import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import FileInput from '../src/FileInput';

const props = {
  submitFile: jest.fn(),
};

describe('<FileInput/> component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<FileInput {...props} />);
  });
  test('should be defined', () => {
    expect(wrapper).toBeDefined();
  });
  test('should match snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  test('should call submit file', () => {
    wrapper.instance().fileInput.current = { files: { name: 'fileName' } };
    wrapper.find('input').simulate('change');
    expect(props.submitFile).toHaveBeenCalled();
  });
});
