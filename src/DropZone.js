/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable func-names */
/* eslint-disable react/no-unused-state */
import React from 'react';
import styled from 'styled-components';
import { Paper, Typography } from '@material-ui/core';

const HeightPaper = styled(Paper)`
  && {
    margin-top: 20px;
    height: 250px;
    width: 90%;
    border: 2px solid ${({ dragging }) => (dragging ? 'green' : '#000')};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;


class DropZone extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isDragging: false,
    };
  }

  addHover = () => {
    this.setState({ isDragging: true });
  }

  onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.dataTransfer;
    this.props.submitFile(files);
  }

  handleOnDragOver = (e) => {
    e.preventDefault();
    return false;
  }

  handleOnDragLeave = () => {
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
        onDragEnter={this.addHover}
        onDragOver={this.handleOnDragOver}
        onDrop={this.onDrop}
        onDragLeave={this.handleOnDragLeave}
      >
        <Typography variant="h3">{`${text} files here`}</Typography>
      </HeightPaper>
    );
  }
}

export default DropZone;
