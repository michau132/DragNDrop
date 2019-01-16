/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable operator-linebreak */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component, Fragment } from 'react';
import { SnackbarProvider, withSnackbar } from 'notistack';
import { Button } from '@material-ui/core';
import EXIF from 'exif-js';

const toDecimal = (number) => {
  return number[0].numerator + number[1].numerator /
       (60 * number[1].denominator) + number[2].numerator / (3600 * number[2].denominator);
};

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

class SubmitFile extends Component {
  submitFile = (files) => {
    const correctType = (file) => {
      generateThumbnail(file)
        .then(({ url, position }) => {
          const isFileInArray = this.props.images.some(el => el.avatar === url);
          console.log(isFileInArray);
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


    [].forEach.call(files, (file) => {
      if (file.type.match('image.*')) {
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
