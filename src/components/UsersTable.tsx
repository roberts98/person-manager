import React, { useState, useContext } from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { UserContext, Actions, User } from '../context/UserContext';
import Modal from './Modal';
import EditForm from './EditForm';
import Dialog from './Dialog';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function UsersTable() {
  const classes = useStyles();
  const { state, dispatch } = useContext(UserContext);
  const [currentlyEdited, setCurrentlyEdited] = useState<User>();
  const [userIdToRemove, setUserIdToRemove] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function closeModal() {
    setIsModalOpen(false);
  }

  function handleEdit(user: User) {
    setIsModalOpen(true);
    setCurrentlyEdited(user);
  }

  function handleRemoveClick(userId: string) {
    setUserIdToRemove(userId);
  }

  function handleRemove(userId: string) {
    dispatch({ type: Actions.removeUser, payload: userId });
    setUserIdToRemove('');
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>First name</StyledTableCell>
              <StyledTableCell>Last name</StyledTableCell>
              <StyledTableCell>City</StyledTableCell>
              <StyledTableCell>Country</StyledTableCell>
              <StyledTableCell>Thumbnail</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.users.map((user) => (
              <StyledTableRow key={user.login.uuid}>
                <StyledTableCell component="th" scope="row">
                  {user.name.first}
                </StyledTableCell>
                <StyledTableCell>{user.name.last}</StyledTableCell>
                <StyledTableCell>{user.location.city}</StyledTableCell>
                <StyledTableCell>{user.location.country}</StyledTableCell>
                <StyledTableCell>
                  <img src={user.picture.thumbnail} alt={user.name.first} />
                </StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>
                  <span onClick={() => handleEdit(user)}>Edit</span> |{' '}
                  <span onClick={() => handleRemoveClick(user.login.uuid)}>Remove</span>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {currentlyEdited && (
        <Modal isOpen={isModalOpen} handleClose={closeModal}>
          <EditForm onSubmit={closeModal} data={currentlyEdited} />
        </Modal>
      )}
      {userIdToRemove && (
        <Dialog
          isOpen={!!userIdToRemove}
          onConfirm={() => handleRemove(userIdToRemove)}
          onDecline={() => setUserIdToRemove('')}
        />
      )}
    </div>
  );
}

export default UsersTable;