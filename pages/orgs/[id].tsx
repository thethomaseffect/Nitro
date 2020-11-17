import {
  Container,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from '@material-ui/core';
import Image from 'material-ui-image';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import InfoIcon from '@material-ui/icons/Info';
import { getAllOrganizationIds, getOrganizationById } from 'adapters/db/organization';
import { GetStaticPaths, GetStaticProps } from 'next';
import * as React from 'react';
import { Organization } from 'types';
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

const OrganizationPage: React.FC<{ org: Organization }> = ({ org }) => {
  console.log(org);
  const classes = useStyles();
  return (
    <Layout>
      <Container>
        <br />
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <Paper className={classes.paper}>
                <Typography variant="h4">{org.name}</Typography>
                <Typography className={classes.location} variant="h6">
                  <LocationOnIcon color="primary" fontSize="small" />{' '}
                  {org.locations[0] && 'geo' in org.locations[0] ? 'A complex location' : org.locations[0]?.simple}
                </Typography>
                <Image src="http://loremflickr.com/300/200" />
              </Paper>
            </Grid>

            <Grid item xs={12} sm={9}>
              <Paper className={classes.recruitPaper} variant="outlined" square>
                <Typography variant="h3">Open Positions</Typography>
                <Typography variant="subtitle1">
                  <InfoIcon fontSize="inherit" /> This section is only displayed to accounts in job-seeking mode
                </Typography>
                <br />
                <List>
                  <ListItem>
                    <Avatar alt="This user matches this role" className={classes.compatSuccess}>
                      76%
                    </Avatar>
                    <ListItemText primary="Senior Software Engineer" secondary="Galway, Ireland" />
                  </ListItem>
                  <ListItem>
                    <Avatar alt="This user is a poor match for this role" className={classes.compatLow}>
                      52%
                    </Avatar>
                    <ListItemText primary="Lead Software Engineer" secondary="Galway, Ireland" />
                  </ListItem>
                  <ListItem>
                    <Avatar alt="This user is incompatible role" className={classes.compatFail}>
                      0%
                    </Avatar>
                    <ListItemText primary="Junior PHP Developer" secondary="Copenhagen, Denmark" />
                  </ListItem>
                </List>
              </Paper>
              <br />
              <Paper className={classes.paper}>
                <Typography variant="h3">About</Typography>
                <br />
                <Typography>{org.about}</Typography>
              </Paper>
              <br />
              <br />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllOrganizationIds().map((id) => ({ params: { id } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.id) {
    throw new Error('Required param is missing');
  }
  const org = getOrganizationById(params.id.toString());
  return {
    props: {
      org,
    },
  };
};

export default OrganizationPage;
