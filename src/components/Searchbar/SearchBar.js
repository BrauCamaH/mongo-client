import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { Button } from '../index';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 420,
    backgroundColor: theme.palette.grey,
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px',
  },
  buttonContainer: {
    marginLeft: '1em',
  },
}));

const SearchInput = (props) => {
  const { className, onChange, onFind, style, validator, ...rest } = props;

  const classes = useStyles();

  const [text, setText] = useState('{}');
  const [isValid, setIsValid] = useState(true);

  const handleText = (event) => {
    setText(event.target.value);
    setIsValid(validator(event.target.value));
  };
  const handleFind = () => {
    onFind(text);
  };
  return (
    <>
      <Paper {...rest} className={clsx(classes.root, className)} style={style}>
        <SearchIcon className={classes.icon} />
        <Input
          {...rest}
          type='search'
          value={text}
          className={classes.input}
          disableUnderline
          onChange={(e) => {
            handleText(e);
          }}
        />
        <div className={classes.buttonContainer}>
          <Button
            size='sm'
            color='info'
            onClick={handleFind}
            disabled={!isValid}
          >
            FIND
          </Button>
        </div>
      </Paper>
    </>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
  onFind: PropTypes.func.isRequired,
  style: PropTypes.object,
};

export default SearchInput;
