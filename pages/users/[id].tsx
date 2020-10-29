import { Container, createStyles, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import Image from 'material-ui-image';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { getAllUserIds, getUserById } from 'adapters/db/user';
import { GetStaticPaths, GetStaticProps } from 'next';
import * as React from 'react';
import { User } from 'types';
import { Layout } from '../../components/Layout';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
    },
    location: {
      color: theme.palette.text.secondary,
    },
  }),
);

const UserPage: React.FC<{ user: User }> = ({ user }) => {
  const classes = useStyles();

  return (
    <Layout>
      <Container>
        <br />
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <Paper className={classes.paper}>
                <Typography variant="h4">
                  {user.surnameFirst ? user.lastName + ' ' + user.firstName : user.firstName + ' ' + user.lastName}
                </Typography>
                <Typography className={classes.location} variant="h6">
                  <LocationOnIcon />{' '}
                  {user.currentLocation && 'geo' in user.currentLocation
                    ? 'A complex location'
                    : user.currentLocation?.simple}
                </Typography>
                <Image src="http://loremflickr.com/300/200" />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Paper>
                <Typography variant="h3">About</Typography>
                <br />
                <Typography>{user.about}</Typography>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllUserIds().map((id) => ({ params: { id } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.id) {
    throw new Error('Required param is missing');
  }
  const user = getUserById(params.id.toString());
  return {
    props: {
      user,
    },
  };
};

export default UserPage;
