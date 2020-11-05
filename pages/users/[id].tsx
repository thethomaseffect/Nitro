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
  List,
  ListItem,
  ListItemText,
  Avatar,
} from '@material-ui/core';
import Image from 'material-ui-image';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import InfoIcon from '@material-ui/icons/Info';
import { getAllUserIds, getUserById } from 'adapters/db/user';
import { GetStaticPaths, GetStaticProps } from 'next';
import * as React from 'react';
import { RelevantExperience, User } from 'types';
import { Layout } from '../../components/Layout';
import humanizeDuration from 'humanize-duration';

const durationMilliseconds = (fromStr: string, toStr?: string): number => {
  const from = new Date(fromStr).getTime();
  const to = toStr ? new Date(toStr).getTime() : new Date().getTime();
  return to - from;
};

const durationHumanized = (fromStr: string, toStr?: string): string => {
  const duration = durationMilliseconds(fromStr, toStr);
  return humanizeDuration(duration, { units: ['y', 'mo'], round: true });
};

const totalSkillDurationsMilliseconds = (relevantExperience: RelevantExperience[]): Map<string, number> => {
  const totalSkillDurations = new Map<string, number>();
  relevantExperience.map((experience) => {
    experience.skills.map((skill) => {
      if ('id' in skill) {
        // Complex Skill, we would grab the details from the API and then use the id as the key
        return;
      }
      if (skill.duration) {
        const currentTotal = totalSkillDurations.get(skill.simple);
        if (typeof currentTotal !== 'undefined') {
          totalSkillDurations.set(skill.simple, currentTotal + skill.duration);
        } else {
          totalSkillDurations.set(skill.simple, skill.duration);
        }
      } else {
        const currentTotal = totalSkillDurations.get(skill.simple);
        const duration = durationMilliseconds(experience.startDate, experience.endDate);
        if (typeof currentTotal !== 'undefined') {
          totalSkillDurations.set(skill.simple, currentTotal + duration);
        } else {
          totalSkillDurations.set(skill.simple, duration);
        }
      }
    });
  });
  return totalSkillDurations;
};

const totalSkillDurationsHumanized = (
  relevantExperience: RelevantExperience[],
): { label: string; duration: string }[] => {
  const durations = totalSkillDurationsMilliseconds(relevantExperience);
  const finalArray: { label: string; duration: string }[] = [];
  durations.forEach((durationMilliseconds, label) => {
    finalArray.push({
      label,
      duration: humanizeDuration(durationMilliseconds, { units: ['y', 'mo'], round: true }),
    });
  });
  return finalArray;
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
    recruitPaper: {
      padding: theme.spacing(1),
      'background-color': theme.palette.info.main,
    },
    compatSuccess: {
      'background-color': theme.palette.success.main,
      'margin-right': theme.spacing(1),
    },
    compatLow: {
      'background-color': theme.palette.grey[500],
      'margin-right': theme.spacing(1),
    },
    compatFail: {
      'background-color': theme.palette.error.main,
      'margin-right': theme.spacing(1),
    },
  }),
);

const UserPage: React.FC<{ user: User }> = ({ user }) => {
  const classes = useStyles();
  const durations = totalSkillDurationsHumanized(user.experience);
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
              <Paper className={classes.recruitPaper} variant="outlined" square>
                <Typography variant="h3">Compatibility</Typography>
                <Typography variant="subtitle1">
                  <InfoIcon fontSize="inherit" /> This section is only displayed to accounts in recruitment mode
                </Typography>
                <br />
                <List>
                  <ListItem>
                    <Avatar alt="This user matches this role" className={classes.compatSuccess}>
                      76%
                    </Avatar>
                    <ListItemText primary="Senior Software Engineer" secondary="Some Big Company" />
                  </ListItem>
                  <ListItem>
                    <Avatar alt="This user is a poor match for this role" className={classes.compatLow}>
                      52%
                    </Avatar>
                    <ListItemText primary="Lead Software Engineer" secondary="A Medium Sized Company" />
                  </ListItem>
                  <ListItem>
                    <Avatar alt="This user is incompatible role" className={classes.compatFail}>
                      0%
                    </Avatar>
                    <ListItemText primary="Junior PHP Developer" secondary="Some Small Company" />
                  </ListItem>
                </List>
              </Paper>
              <br />
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
                            {durationHumanized(experience.startDate, experience.endDate)}
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
              <br />
              <Paper className={classes.paper}>
                <Typography variant="h3">Skills</Typography>
                <br />
                <List>
                  {durations.map(({ label, duration }) => (
                    <ListItem key={label}>
                      <ListItemText primary={label} secondary={duration} />
                    </ListItem>
                  ))}
                </List>
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
