/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styled from 'styled-components';
import { Typography, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const StyledTypography = styled(Typography)`
  && {
    margin-right: 20px;
  }
`;

class Input extends React.Component {
  static propTypes = {
    submitFile: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  getFiles = () => {
    const { files } = this.fileInput.current;
    const { submitFile } = this.props;
    submitFile(files);
    this.fileInput.current.value = '';
  }

  render() {
    return (
      <div>
        <StyledTypography variant="subtitle1">Upload your files</StyledTypography>
        <input
          hidden
          id="file"
          type="file"
          name="files[]"
          accept="image/*"
          multiple
          ref={this.fileInput}
          onChange={this.getFiles}
        />
        <label htmlFor="file">
          <Button
            color="primary"
            variant="contained"
            component="span"
          >
          Upload
          </Button>
        </label>
      </div>
    );
  }
}

export default Input;
