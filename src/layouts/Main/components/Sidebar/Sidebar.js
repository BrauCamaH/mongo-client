import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, SwipeableDrawer } from '@material-ui/core';
import {
  Dashboard,
  Receipt,
  Fastfood,
  EventSeat,
  AssignmentInd,
  People as PeopleIcon
} from '@material-ui/icons';

import SidebarNav from './components/SidebarNav';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onOpen, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <Dashboard />
    },
    {
      title: 'Users',
      href: '/users',
      icon: <PeopleIcon />
    },
    {
      title: 'Orders',
      href: '/orders',
      icon: <Receipt />
    },
    {
      title: 'Products',
      href: '/categories',
      icon: <Fastfood />
    },
    {
      title: 'Tables',
      href: '/tables',
      icon: <EventSeat />
    },
    {
      title: 'Clients',
      href: '/clients',
      icon: <AssignmentInd />
    }
  ];

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
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={pages} />
      </div>
    </SwipeableDrawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
