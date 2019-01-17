/* eslint-disable react/destructuring-assignment */
/* eslint-disable func-names */
import React, { Component, Fragment } from 'react';
import { SnackbarProvider, withSnackbar } from 'notistack';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import EXIF from 'exif-js';

export const toDecimal = number => number[0].numerator + number[1].numerator
       / (60 * number[1].denominator) + number[2].numerator / (3600 * number[2].denominator);

function generateThumbnail(file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    reader.onloadend = () => {
      EXIF.getData(file, function () {
        const GPSLongitude = EXIF.getTag(this, 'GPSLongitude');
        const GPSLatitude = EXIF.getTag(this, 'GPSLatitude');
        if (!GPSLatitude && !GPSLongitude) {
          return reject(new Error(`${file.name} does not have any GPS coordinations`));
        }
        const lng = toDecimal(GPSLongitude);
        const lat = toDecimal(GPSLatitude);
        return resolve({
          url: reader.result,
          position: { lng, lat },
        });
      });
    };
  });
}

export class SubmitFile extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
      avatar: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    updateImages: PropTypes.func.isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
  }

  submitFile = (files) => {
    const correctType = (file) => {
      generateThumbnail(file)
        .then(({ url, position }) => {
          const isFileInArray = this.props.images.some(el => el.avatar === url);
          if (!isFileInArray) {
            return this.props.updateImages({
              avatar: url,
              name: file.name,
              type: file.type,
              size: file.size,
              position,
            });
          }
          const errorMessage = `${file.name} already exists in list`;
          this.showErrorSnackbar(errorMessage);
          return null;
        })
        .catch(err => this.showErrorSnackbar(err.message));
    };

    const anotherType = (file) => {
      const err = `${file.name} has invalid type file. Only images are allowed`;
      this.showErrorSnackbar(err);
    };


    // eslint-disable-next-line consistent-return
    [].forEach.call(files, (file) => {
      if (file.type.match('image.*')) {
        if (file.size > 1000000) {
          const sizeError = `${file.name} exceeds allowed size of 1mb`;
          return this.showErrorSnackbar(sizeError);
        }
        correctType(file);
      } else {
        anotherType(file);
      }
    });
  }

  showErrorSnackbar = message => this.props.enqueueSnackbar(message, { variant: 'error', autoHideDuration: 6000, action: <Button size="small">Dismiss</Button> })

  render() {
    const { submitFile } = this;
    const { render } = this.props;
    return (
      <Fragment>
        {render({ submitFile })}
      </Fragment>
    );
  }
}


const SubmitFileWithSnackbar = withSnackbar(SubmitFile);

const MySnackProvider = props => (
  <SnackbarProvider maxSnack={10}>
    <SubmitFileWithSnackbar {...props} />
  </SnackbarProvider>
);

export default MySnackProvider;
