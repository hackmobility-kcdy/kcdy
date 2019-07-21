import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { TimePicker } from "@material-ui/pickers";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const CommuteForm = props => {
  const [ startTime, setStartTime ] = useState('2019-07-21T00:00:00.000Z');
  const [ endTime, setEndTime ] = useState('2019-07-21T00:00:00.000Z');
  const [ home, setHome ] = useState('');
  const [ work, setWork ] = useState('');

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Tell us about your commute
      </Typography>

      <br />
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ButtonGroup size="medium">
          <Button>Mon</Button>
          <Button>Tue</Button>
          <Button>Wed</Button>
          <Button>Thu</Button>
          <Button>Fri</Button>
          <Button>Sat</Button>
          <Button>Sun</Button>
        </ButtonGroup>
      </div>

      <br />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h4>Go to work at...</h4>
          <TimePicker
            autoOk
            variant="inline"
            value={startTime}
            onChange={setStartTime}
          />
        </div>
        
        <div style={{ width: '15px' }} />
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h4>Return home at...</h4>
          <TimePicker
            autoOk
            variant="inline"
            value={endTime}
            onChange={setEndTime}
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
          value={home}
          onChange={e => setHome(e.target.value)}
          margin="normal"
          variant="outlined"
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography align='center' style={{ width: '200px' }}>Work Location</Typography>
        <div style={{ width: '15px' }} />
        <TextField
          label="Address"
          value={work}
          onChange={e => setWork(e.target.value)}
          margin="normal"
          variant="outlined"
        />
      </div>
    </React.Fragment>
  );
}

export default CommuteForm
