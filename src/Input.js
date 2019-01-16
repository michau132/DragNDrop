/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styled from 'styled-components';
import { Typography, Button } from '@material-ui/core';

const FileInput = styled.input`
  display: none;
`;

const StyledTypography = styled(Typography)`
  && {
    margin-right: 20px;
  }
`;

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  getFiles = () => {
    const { files } = this.fileInput.current;
    // eslint-disable-next-line react/prop-types
    this.props.submitFile(files);
  }

  render() {
    return (
      <div>
        <StyledTypography variant="subtitle1">Upload your files</StyledTypography>
        <FileInput
          id={0}
          type="file"
          accept="image/*"
          multiple
          ref={this.fileInput}
          onChange={this.getFiles}
        />
        <label htmlFor={0}>
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
