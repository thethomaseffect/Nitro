import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
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
          <Link href="/users/1">
            <a>User 1</a>
          </Link>
          <Link href="/users/2">
            <a>User 2</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
