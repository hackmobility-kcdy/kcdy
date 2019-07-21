import React, { useReducer, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DailyForm from './form_car';
import WeekendForm from './form_commute';
import HolidayForm from './form_preference';

const initialState = {
  carMake: '',
  carModel: '',
  carVIN: '',
  commuteDays: [], // array of work days
  commuteStartTime: '2019-07-21T00:00:00.000Z',
  commuteEndTime: '2019-07-21T00:00:00.000Z',
  homeLocation: '',
  workLocation: '',
  preference: ''
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CAR_MAKE':
      return {...state, carMake: action.payload }
    case 'SET_CAR_MODEL':
      return {...state, carModel: action.payload }
    case 'SET_CAR_VIN':
      return {...state, carVIN: action.payload }
    case 'SET_COMMUTE_DAYS':
      return {...state, commuteDays: action.payload }
    case 'SET_COMMUTE_STARTTIME':
      return {...state, commuteStartTime: action.payload }
    case 'SET_COMMUTE_ENDTIME':
      return {...state, commuteEndTime: action.payload }
    case 'SET_LOCATION_HOME':
      return {...state, homeLocation: action.payload }
    case 'SET_LOCATION_WORK':
      return {...state, workLocation: action.payload }
    case 'SET_PREFERENCE':
        return {...state, preference: action.payload }
    default:
      return state
  }
}

const steps = ['Vehicle Information', 'Daily Commute', 'Preference'];

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const Quetionnaire = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log('this is state', state)
  }, [state])

  const getStepContent = step => {
    switch (step) {
      case 0:
        return <DailyForm 
          state={state}
          dispatch={dispatch}
        />;
      case 1:
        return <WeekendForm 
          state={state}
          dispatch={dispatch}
        />;
      case 2:
        return <HolidayForm 
          state={state}
          dispatch={dispatch}
        />;
      default:
        throw new Error('Unknown step');
    }
  }
  
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  

  return (
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Peak Load Shaving
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you.
                </Typography>
                <Typography variant="subtitle1">
                  We will calculate the optimal schedule for peak load sharing.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Submit Form' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
  );
}

export default Quetionnaire
