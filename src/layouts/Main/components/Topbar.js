import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { withRouter } from 'react-router-dom';
// import { Logo } from '../../../../tools';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    background: '#4caf50'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen } = props;
  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)}>
      <Toolbar>
        <Hidden lgUp>
          <IconButton color='inherit' onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default withRouter(Topbar);
