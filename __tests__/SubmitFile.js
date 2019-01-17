import React from 'react';
import { shallow } from 'enzyme';
import { SubmitFile, toDecimal } from '../src/SubmitFile';

const props = {
  enqueueSnackbar: jest.fn(),
  files: [{
    avatar: 'someUrl',
    position: {
      lng: 12.12,
      lat: 12.13,
    },
    name: 'fileName.jpg',
    size: 12353,
    type: '.jpg',
  }],
  render: jest.fn(),
  images: [],
  updateImages: jest.fn(),
};

describe('<SubmitFile/> component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SubmitFile {...props} />);
  });

  test('should be defined', () => {
    expect(wrapper).toBeDefined();
  });

  test('should call enqueueSnackbar with error that file is not image', () => {
    wrapper.instance().submitFile([{
      name: 'file.txt',
      size: 201,
      type: 'text/plain',
      webkitRelativePath: '',
    }]);
    expect(props.enqueueSnackbar).toHaveBeenCalledWith('file.txt has invalid type file. Only images are allowed', expect.anything());
  });

  test('should call enqueueSnackbar with error that file is too big', () => {
    wrapper.instance().submitFile([{
      lastModified: 1541661451532,
      name: 'file.png',
      size: 6000000,
      type: 'image/png',
      webkitRelativePath: '',
    }]);
    expect(props.enqueueSnackbar).toHaveBeenCalledWith('file.png exceeds allowed size of 1mb', expect.anything());
  });

  test('should return correct coordinates', () => {
    const numbers = [
      { numerator: 11, denominator: 1 },
      { numerator: 52, denominator: 1 },
      { numerator: 451680000, denominator: 10000000 },
    ];
    const property = toDecimal(numbers);
    expect(property).toBe(11.879213333333334);
  });
});
