import React, { useEffect } from 'react';

import { useAuth } from 'use-auth0';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',
    height: '100vh',
  },
}));
const Auth0CallbackPage = (): JSX.Element => {
  const { handleAuthentication } = useAuth();
  useEffect(() => {
    handleAuthentication();
  });
  const classes = useStyles();

  return <div className={classes.root}>Loading...</div>;
};

export default Auth0CallbackPage;
