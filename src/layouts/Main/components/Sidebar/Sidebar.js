import React, { useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, SwipeableDrawer } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import SidebarNav from './components/SidebarNav';

import DbContext from '../../../../context/db-context';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)',
    },
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
  link: {
    '&,&:hover,&:focus': {
      color: 'inherit',
      textDecoration: 'none',
      display: 'block',
      padding: '10px 20px',
    },
  },
}));

const Sidebar = (props) => {
  const context = useContext(DbContext);

  const { open, variant, onOpen, onClose, className, ...rest } = props;

  const classes = useStyles();

  return (
    <SwipeableDrawer
      anchor='left'
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      onOpen={onOpen}
      variant={variant}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        <NavLink className={classes.link} to='/'>
          Mongo-client
        </NavLink>
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={context.dbs.map((db) => ({
            title: db.name,
            href: `/db?name=${db.name}`,
          }))}
        />
      </div>
    </SwipeableDrawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Sidebar;
