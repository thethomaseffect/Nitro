import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { UserMenu } from './UserMenu';
import { Typography } from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
    },
    homeLink: {
      'text-decoration': 'none',
      color: '#fff',
    },
  }),
);

interface LayoutProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container?: Element;
}

export const Layout: React.FC<LayoutProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography className={classes.homeLink} variant="h6" noWrap>
            <Link href="/">
              <a className={classes.homeLink}>Untitled Job Site</a>
            </Link>
          </Typography>

          <UserMenu />
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
};
