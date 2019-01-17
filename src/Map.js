import React from 'react';
import styled from 'styled-components';
import {
  Map as LeafletMap, TileLayer, Marker, Popup,
} from 'react-leaflet';
import PropTypes from 'prop-types';

const StyledLeafletMap = styled(LeafletMap)`
  height: 300px;
`;

class Map extends React.Component {
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        position: PropTypes.shape({
          lat: PropTypes.number.isRequired,
          lng: PropTypes.number.isRequired,
        }).isRequired,
      }).isRequired,
    ).isRequired,
  }

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
