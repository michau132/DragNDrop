/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-unused-state */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';
import {
  Paper, Grid,
} from '@material-ui/core';
import Map from './Map';
import Input from './Input';
import FileList from './FileList';
import Dropzone from './DropZone';
import GlobalStyle from './GlobalStyle';
import SubmitFile from './SubmitFile';

const Main = styled.main`
  display: flex;
  justify-content:center;
  align-items: center;
`;

const PaperWithPadding = styled(Paper)`
  && {
  padding: 10px;
  background-color: #8FB299;
  width: 100%;
  }
`;

const GridWithNoMargin = styled(Grid)`
  && {
    margin: 0;
    width: 100%;
  }
`;

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      images: [],
    };
  }

  updateImages = (item) => {
    this.setState(prevState => ({
      images: [...prevState.images, item],
    }));
  }

  removeImage = (index) => {
    const images = this.state.images.filter((_, i) => index !== i);
    this.setState({
      images,
    });
  }

  render() {
    return (
      <Main
        onDrop={this.handleDrop}
        onDragOver={this.handleOnDragOver}
        onDragEnter={this.handleOnDragEnter}
        onDragEnd={this.handleOnDragLeave}
      >
        <GlobalStyle />
        <PaperWithPadding>
          <Map images={this.state.images} />
          <Paper>
            <GridWithNoMargin container justify="space-around" spacing={40}>
              <SubmitFile
                images={this.state.images}
                updateImages={this.updateImages}
                render={props => (
                  <Grid item md={4} container justify="center">
                    <Input {...props} />
                    <Dropzone {...props} />
                  </Grid>
                )}
              />

              <Grid item md={8}>
                <FileList
                  list={this.state.images}
                  removeImage={this.removeImage}
                />
              </Grid>
            </GridWithNoMargin>
          </Paper>
        </PaperWithPadding>
      </Main>
    );
  }
}

export default App;
