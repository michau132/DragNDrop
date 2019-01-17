import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Paper, Typography } from '@material-ui/core';

const HeightPaper = styled(Paper)`
  && {
    margin-top: 20px;
    height: 250px;
    width: 90%;
    border: 2px dashed ${({ dragging }) => (dragging ? 'green' : '#000')};
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 2;
  }
`;

const StyledTypo = styled(Typography)`
  transition: 0.5s all;
  position: relative;
  z-index: 1;
  opacity: ${({ dragging }) => (dragging ? '0.5' : '1')};
`;

function preventDefaultAction(e) {
  e.preventDefault();
  e.stopPropagation();
}

class DropZone extends React.Component {
  static propTypes = {
    submitFile: PropTypes.func.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      isDragging: false,
    };
  }


  handleOnDragEnter = (e) => {
    preventDefaultAction(e);
    this.setState({ isDragging: true });
  }

  handleOnDrop = (e) => {
    preventDefaultAction(e);
    const { submitFile } = this.props;
    this.setState({
      isDragging: false,
    });
    const { files } = e.dataTransfer;
    submitFile(files);
  }

  handleOnDragOver = (e) => {
    preventDefaultAction(e);
    this.setState({
      isDragging: true,
    });
    return false;
  }

  handleOnDragLeave = (e) => {
    preventDefaultAction(e);
    this.setState({
      isDragging: false,
    });
  }

  render() {
    const { isDragging } = this.state;
    const text = isDragging ? 'Drop' : 'Drag';
    return (
      <HeightPaper
        dragging={isDragging ? 1 : 0}
        onDragEnter={this.handleOnDragEnter}
        onDragOver={this.handleOnDragOver}
        onDrop={this.handleOnDrop}
        onDragLeave={this.handleOnDragLeave}
      >
        <StyledTypo variant="h5" dragging={isDragging ? 1 : 0}>
          {`${text} files here`}
        </StyledTypo>
      </HeightPaper>
    );
  }
}

export default DropZone;
