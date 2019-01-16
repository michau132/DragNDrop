/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import styled from 'styled-components';
import {
  Map as LeafletMap, TileLayer, Marker, Popup,
} from 'react-leaflet';

const StyledLeafletMap = styled(LeafletMap)`
  height: 300px;
`;

class Map extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.mapApi = React.createRef();
  }

  render() {
    const { images } = this.props;
    return (
      <StyledLeafletMap center={[45, 25]} zoom={4} ref={this.mapApi}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {
          images.map((marker) => {
            const position = [marker.position.lat, marker.position.lng];
            return (
              <Marker position={position} key={marker.avatar}>
                <Popup>{marker.name}</Popup>
              </Marker>
            );
          })
        }
      </StyledLeafletMap>
    );
  }
}

export default Map;
