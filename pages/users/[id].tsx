import {
  Container,
  createStyles,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
  Box,
  Chip,
} from '@material-ui/core';
import Image from 'material-ui-image';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { getAllUserIds, getUserById } from 'adapters/db/user';
import { GetStaticPaths, GetStaticProps } from 'next';
import * as React from 'react';
import { User } from 'types';
import { Layout } from '../../components/Layout';
import humanizeDuration from 'humanize-duration';

const humanizedDuration = (fromStr: string, toStr?: string): string => {
  const from = new Date(fromStr).getTime();
  const to = toStr ? new Date(toStr).getTime() : new Date().getTime();
  const duration = to - from;
  return humanizeDuration(duration, { units: ['y', 'mo'], round: true });
};

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
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <Paper className={classes.paper}>
                <Typography variant="h4">
                  {user.surnameFirst ? user.lastName + ' ' + user.firstName : user.firstName + ' ' + user.lastName}
                </Typography>
                <Typography className={classes.location} variant="h6">
                  <LocationOnIcon color="primary" fontSize="small" />{' '}
                  {user.currentLocation && 'geo' in user.currentLocation
                    ? 'A complex location'
                    : user.currentLocation?.simple}
                </Typography>
                <Image src="http://loremflickr.com/300/200" />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Paper className={classes.paper}>
                <Typography variant="h3">About</Typography>
                <br />
                <Typography>{user.about}</Typography>
              </Paper>
              <br />
              <Paper className={classes.paper}>
                <Typography variant="h3">Experience</Typography>
                <br />
                {user.experience.length === 0
                  ? 'Nothing added yet'
                  : user.experience.map((experience, index) => (
                      <Grid container key={index}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="h6">{experience.title}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography>
                            {new Date(experience.startDate).toLocaleDateString('en-gb', {
                              year: 'numeric',
                              month: 'long',
                            }) + ' - '}
                            {experience.endDate
                              ? new Date(experience.endDate).toLocaleDateString('en-gb', {
                                  year: 'numeric',
                                  month: 'long',
                                })
                              : 'Current'}
                            {' ('}
                            {humanizedDuration(experience.startDate, experience.endDate)}
                            {')'}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <Typography className={classes.location}>
                            <LocationOnIcon color="primary" fontSize="inherit" />{' '}
                            {experience.location && 'geo' in experience.location
                              ? 'A complex location'
                              : experience.location?.simple}
                          </Typography>
                        </Grid>
                        <br />
                        <br />
                        <Grid item xs={12} sm={12}>
                          <Typography>{experience.description}</Typography>
                          <br />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          {experience.skills.map((skill, skillIndex) => (
                            <Box key={skillIndex} component="span">
                              <Chip label={'id' in skill ? 'A complex skill' : skill.simple} color="primary" />
                              {'   '}
                            </Box>
                          ))}
                          <br />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          {index + 1 !== user.experience.length ? (
                            <Box>
                              <br />
                              <Divider />
                              <br />
                            </Box>
                          ) : (
                            ''
                          )}
                        </Grid>
                      </Grid>
                    ))}
              </Paper>
            </Grid>
          </Grid>
        </Box>
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
