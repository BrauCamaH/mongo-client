import React, { useState } from 'react';
import clsx from 'clsx';
import Button from '../CustomButtons/Button';
import FormDialog from '../FormDialog';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: { marginBottom: theme.spacing(1) }
}));

const Toolbar = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { className, buttonText, inputs, onSubmit } = props;
  return (
    <div>
      <Button
        color='info'
        round
        className={clsx(classes.root, className)}
        onClick={() => {
          setOpen(true);
        }}
      >
        {buttonText}
      </Button>
      <FormDialog
        open={open}
        inputs={inputs}
        onClose={() => {
          setOpen(false);
        }}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Toolbar;
