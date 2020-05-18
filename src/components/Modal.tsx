import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import MuiModal from '@material-ui/core/Modal';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: '#fff',
      border: '2px solid #000',
      padding: '40px',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
  })
);

function Modal({ children, isOpen, handleClose }: Props) {
  const classes = useStyles();

  return (
    <div>
      <MuiModal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>{children}</div>
      </MuiModal>
    </div>
  );
}

export default Modal;
