import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';
import { Layout } from 'components/Layout';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    textAlign: 'center',
    height: 'calc(100vh - 64px)',
    position: 'relative',
  },
  background: {
    top: 0,
    position: 'absolute',
    width: '100%',
    height: '100%',
    paddingTop: '10%',
    backgroundColor: '#1d1d1d',
    zIndex: -1,
  },
  chipContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  chip: {
    margin: '5px 10px',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
  strip: {
    paddingTop: 30,
    paddingBottom: 30,
  },
}));

const Index: React.FC = () => {
  const classes = useStyles();

  return (
    <Layout>
      <div className={classes.root}>
        <div className={classes.background} />

        <Head>
          <title>Untitled Job Site</title>
        </Head>
        <div className={classes.strip}>
          <Typography variant="h3" gutterBottom>
            Untitled Job Site
          </Typography>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
