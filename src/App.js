import React from 'react';
import styled from 'styled-components';
import {
  Paper, Grid,
} from '@material-ui/core';
import Map from './Map';
import Input from './FileInput';
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
  background-color: rgba(178,161,161, 0.6);
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

  componentDidMount() {
    if (!('draggable' in document.createElement('span')) || !window.FileReader) {
      // eslint-disable-next-line no-alert
      return alert('Your browser does not support dragging');
    }
    return null;
  }

  updateImages = (item) => {
    this.setState(prevState => ({
      images: [...prevState.images, item],
    }));
  }

  removeImage = (index) => {
    this.setState((prevState) => {
      const images = prevState.images.filter((_, i) => index !== i);
      return {
        images,
      };
    });
  }

  render() {
    const { images } = this.state;
    return (
      <Main>
        <GlobalStyle />
        <PaperWithPadding>
          <Map images={images} />
          <Paper>
            <GridWithNoMargin container justify="space-around" spacing={40}>
              <SubmitFile
                images={images}
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
                  list={images}
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
