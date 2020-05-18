import React from 'react';
import Button from '@material-ui/core/Button';
import DialogMui from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
  isOpen: boolean;
  onConfirm: (e: any) => void;
  onDecline: () => void;
}

function Dialog({ isOpen, onConfirm, onDecline }: Props) {
  const [open, setOpen] = React.useState(isOpen);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <DialogMui
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The operation is irreversible
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDecline} color="primary">
            No
          </Button>
          <Button onClick={onConfirm} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </DialogMui>
    </div>
  );
}

export default Dialog;
