/* eslint-disable react/prop-types */
import React from 'react';
import {
  Table, TableCell, TableRow, TableHead, TableBody,
} from '@material-ui/core';
import styled from 'styled-components';
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

export default FileList;
