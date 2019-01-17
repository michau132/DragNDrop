import React from 'react';
import {
  TableCell, TableRow, Avatar, IconButton, Fade,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTableCell = styled(TableCell)`
  && {
    padding: 4px 24px;
  }
`;

const StyledLastCell = styled(TableCell)`
  && {
    padding-left: 0;
  }
`;

const FileListItem = ({
  avatar, name, type, size, position = {}, removeImage, index,
}) => (
  <Fade in={!!name}>
    <TableRow>
      <StyledTableCell align="center"><Avatar src={avatar} /></StyledTableCell>
      <StyledTableCell align="center">{name}</StyledTableCell>
      <StyledTableCell align="center">{type}</StyledTableCell>
      <StyledTableCell align="center">{size}</StyledTableCell>
      <StyledTableCell>
      lat:
        {' '}
        {position.lat}
        <br />
      lng:
        {' '}
        {position.lng}
      </StyledTableCell>
      <StyledLastCell>
        <IconButton onClick={() => removeImage(index)}>
          <Delete />
        </IconButton>
      </StyledLastCell>
    </TableRow>
  </Fade>
);

FileListItem.propTypes = {
  avatar: PropTypes.string.isRequired,
  position: PropTypes.shape({
    lng: PropTypes.number.isRequired,
    lat: PropTypes.number.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  removeImage: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default FileListItem;
