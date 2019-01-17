import React from 'react';
import {
  Table, TableCell, TableRow, TableHead, TableBody,
} from '@material-ui/core';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FileListItem from './FileListItem';

const StyledWrapper = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  height: 250px;
`;

const StyledTableCell = styled(TableCell)`
  && {
    padding: 4px 24px;
  }
`;

const FileList = ({ list, removeImage }) => (
  <div>
    <Table>
      <TableHead>
        <TableRow>
          <StyledTableCell>Avatar</StyledTableCell>
          <StyledTableCell>File name</StyledTableCell>
          <StyledTableCell>File type</StyledTableCell>
          <StyledTableCell>Size</StyledTableCell>
          <StyledTableCell>Geo position</StyledTableCell>
          <StyledTableCell align="center">Delete</StyledTableCell>
        </TableRow>
      </TableHead>
    </Table>
    <StyledWrapper>
      <Table>
        <TableBody>
          {
            list.map((img, index) => (
              <FileListItem
                key={img.avatar}
                index={index}
                removeImage={removeImage}
                {...img}
              />
            ))
          }
        </TableBody>
      </Table>
    </StyledWrapper>
  </div>
);

FileList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      position: PropTypes.shape({
        lng: PropTypes.number.isRequired,
        lat: PropTypes.number.isRequired,
      }).isRequired,
      name: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  removeImage: PropTypes.func.isRequired,
};

export default FileList;
