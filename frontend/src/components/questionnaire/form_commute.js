import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { TimePicker } from "@material-ui/pickers";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const CommuteForm = ({ state, dispatch }) => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Tell us about your commute
      </Typography>

      <br />
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ButtonGroup size="medium">
          <Button onClick={() => dispatch({ type: 'SET_COMMUTE_DAYS', payload: [...state.commuteDays, '1']})}>Mon</Button>
          <Button onClick={() => dispatch({ type: 'SET_COMMUTE_DAYS', payload: [...state.commuteDays, '2']})}>Tue</Button>
          <Button onClick={() => dispatch({ type: 'SET_COMMUTE_DAYS', payload: [...state.commuteDays, '3']})}>Wed</Button>
          <Button onClick={() => dispatch({ type: 'SET_COMMUTE_DAYS', payload: [...state.commuteDays, '4']})}>Thu</Button>
          <Button onClick={() => dispatch({ type: 'SET_COMMUTE_DAYS', payload: [...state.commuteDays, '5']})}>Fri</Button>
          <Button onClick={() => dispatch({ type: 'SET_COMMUTE_DAYS', payload: [...state.commuteDays, '6']})}>Sat</Button>
          <Button onClick={() => dispatch({ type: 'SET_COMMUTE_DAYS', payload: [...state.commuteDays, '7']})}>Sun</Button>
        </ButtonGroup>
      </div>

      <br />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h4>Go to work at...</h4>
          <TimePicker
            autoOk
            variant="inline"
            value={state.startTime}
            onChange={e => dispatch({ type: 'SET_COMMUTE_STARTTIME', payload: e._d })}
          />
        </div>
        
        <div style={{ width: '15px' }} />
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h4>Return home at...</h4>
          <TimePicker
            autoOk
            variant="inline"
            value={state.endTime}
            onChange={e => dispatch({ type: 'SET_COMMUTE_ENDTIME', payload: e._d })}
          />
        </div>
      </div>

      <br />
      <br />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography align='center' style={{ width: '200px' }}>Home Location</Typography>
        <div style={{ width: '15px' }} />
        <TextField
          label="Address"
          value={state.homeLocation}
          onChange={e => dispatch({ type: 'SET_LOCATION_HOME', payload: e.target.value })}
          margin="normal"
          variant="outlined"
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography align='center' style={{ width: '200px' }}>Work Location</Typography>
        <div style={{ width: '15px' }} />
        <TextField
          label="Address"
          value={state.workLocation}
          onChange={e => dispatch({ type: 'SET_LOCATION_WORK', payload: e.target.value })}
          margin="normal"
          variant="outlined"
        />
      </div>
    </React.Fragment>
  );
}

export default CommuteForm
