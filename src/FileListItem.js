/* eslint-disable react/prop-types */
import React from 'react';
import {
  TableCell, TableRow, Avatar, IconButton,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
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
      {position.long}
    </StyledTableCell>
    <StyledLastCell>
      <IconButton onClick={() => removeImage(index)}>
        <Delete />
      </IconButton>
    </StyledLastCell>
  </TableRow>
);

export default FileListItem;
