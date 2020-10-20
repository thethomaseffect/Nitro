import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Typography, Button, Paper, List, ListItem, Popover, Theme } from '@material-ui/core';
import { useAuth } from 'use-auth0';
import { ExitToApp, Person } from '@material-ui/icons';
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    marginRight: 10,
  },
  root: {
    marginLeft: 'auto',
    display: 'flex',
    padding: '10px 10px',
  },
  text: {
    margin: 'auto',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  dropDownIcon: {
    marginRight: 8,
  },
  menuLink: {
    'text-decoration': 'none',
    color: theme.palette.text.primary,
  },
}));

export function UserMenu(): JSX.Element {
  const classes = useStyles();
  const { isAuthenticated, login, logout, user } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  if (isAuthenticated() && user) {
    return (
      <>
        <Button aria-describedby={id} className={classes.root} onClick={handleOpen} color="secondary">
          <Avatar alt={user.name} src={user.picture} className={classes.avatar} />
          <Typography className={classes.text} variant="body2">
            {user.name}
          </Typography>
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Paper>
            <List>
              <ListItem button>
                <Person className={classes.dropDownIcon} />
                <Link href="/users/current">
                  <a className={classes.menuLink}>Profile</a>
                </Link>
              </ListItem>
              <ListItem button onClick={logout}>
                <ExitToApp className={classes.dropDownIcon} />
                Logout
              </ListItem>
            </List>
          </Paper>
        </Popover>
      </>
    );
  } else {
    return (
      <Button color="secondary" className={classes.root} onClick={login}>
        Login
      </Button>
    );
  }
}
