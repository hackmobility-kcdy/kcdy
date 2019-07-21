import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

const PreferenceForm = props => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Preference
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <FormControlLabel
          control={
            <Checkbox
              value="electricity"
              color="primary"
            />
          }
          label="Minimize Electricty Cost"
        />

        <FormControlLabel
          control={
            <Checkbox
              value="carbon"
              color="primary"
            />
          }
          label="Minimize Carbon Footprint"
        />

        <FormControlLabel
          control={
            <Checkbox
              value="accessibility"
              color="primary"
            />
          }
          label="EV Accessibility"
        />

      </div>

    </React.Fragment>
  );
}

export default PreferenceForm