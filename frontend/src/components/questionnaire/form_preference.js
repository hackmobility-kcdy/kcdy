import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const PreferenceForm = ({ state, dispatch }) => {
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
              onChange={() => dispatch({ type: 'SET_PREFERENCE', payload: 'electricity' })}
            />
          }
          label="Minimize Electricty Cost"
        />

        <FormControlLabel
          control={
            <Checkbox
              value="carbon"
              color="primary"
              onChange={() => dispatch({ type: 'SET_PREFERENCE', payload: 'carbon' })}
            />
          }
          label="Minimize Carbon Footprint"
        />

        <FormControlLabel
          control={
            <Checkbox
              value="accessibility"
              color="primary"
              onChange={() => dispatch({ type: 'SET_PREFERENCE', payload: 'accessibility' })}
            />
          }
          label="EV Accessibility"
        />

      </div>

    </React.Fragment>
  );
}

export default PreferenceForm