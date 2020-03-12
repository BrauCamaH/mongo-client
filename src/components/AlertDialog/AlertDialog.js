import React from 'react';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';

const AlertDialog = props =>{
const { title, contentText, open, onClose, onAgree, ...rest } = props;

const handleAgree = () =>{
    onAgree();
    onClose();
}

return (
    <Dialog
    {...rest}
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {contentText}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Close
      </Button>
      <Button onClick={handleAgree} color="primary" autoFocus>
        Agree
      </Button>
    </DialogActions>
  </Dialog>
)
}

export default AlertDialog;