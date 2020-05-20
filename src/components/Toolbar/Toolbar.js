import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Button from '../CustomButtons/Button';
import FormDialog from '../FormDialog';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: { marginBottom: theme.spacing(1) },
  link: {
    textDecoration: 'none',
  },
}));

const Toolbar = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const {
    className,
    buttonText,
    dialogButtonText,
    inputs,
    onSubmit,
    optionalButton,
    optionalButtonText,
    optionalButtonLink,
  } = props;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
        {optionalButton && (
          <Link className={classes.link} to={optionalButtonLink || '/'}>
            <Button
              color='info'
              className={clsx(classes.root, className)}
              onClick={() => {
                setOpen(true);
              }}
            >
              {optionalButtonText}
            </Button>
          </Link>
        )}
      </div>
      <FormDialog
        open={open}
        inputs={inputs}
        onClose={() => {
          setOpen(false);
        }}
        onSubmit={onSubmit}
        submitButtonText={dialogButtonText || 'Submit'}
      />
    </div>
  );
};

export default Toolbar;
