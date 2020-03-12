import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import clsx from 'clsx';
import Button from '../CustomButtons/Button';

import {
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  useMediaQuery,
  useTheme
} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  cancelButton: {
    marginRight: theme.spacing(2)
  }
}));

export default function FormDialog(props) {
  const { title, className, open, onClose, onSubmit, inputs, ...rest } = props;
  const [formState, setFormState] = useState({
    values: {}
  });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value
      }
    }));
  };

  const handleSubmit = () => {
    onSubmit(formState.values);
    onClose();
  };

  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <span className={classes.spacer} />
      </div>
      <Dialog
        {...rest}
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle aria-labelledby='customized-dialog-title'>
          {title ? title : ''}
          <IconButton
            className={classes.closeButton}
            onClick={onClose}
            color='primary'
          >
            <EditIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {inputs &&
            inputs.map(input => (
              <TextField
                type='text'
                key={input.id}
                name={input.name}
                label={input.text}
                onChange={handleChange}
                fullWidth
              />
            ))}
        </DialogContent>
        <DialogActions>
          <div>
            <Button className={classes.cancelButton} onClick={onClose}>
              Cancel
            </Button>
            <Button color='info' onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
