import React, { useState } from 'react';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';

const carMakeOptions = [
  { value: 'Audi', label: 'Audi' },
  { value: 'BMW', label: 'BMW' },
  { value: 'Buick', label: 'Buick' },
  { value: 'Cadillac', label: 'Cadillac' },
  { value: 'Lexus', label: 'Lexus' },
  { value: 'Tesla', label: 'Tesla' },
  { value: 'Volkswagen', label: 'Volkswagen' }
];

const carModelOptions = [
  { value: 'Tesla Model 3', label: 'Tesla Model 3' },
  { value: 'Tesla Model X', label: 'Tesla Model X' },
  { value: 'Tesla Model S', label: 'Tesla Model S' },
]

const CarForm = ({ state, dispatch }) => {
  const [ carMake, setCarMake ] = useState('')
  const [ carModel, setCarModel ] = useState('')

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Tell us about your vehicle
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src='./images/electric-vehicle.jpg'/>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h4>Car Make</h4>
        <div style={{ width: '15px' }}/>
        <div style={{ width: '150px' }}>
          <Select 
            value={{ label: state.carMake}}
            onChange={choice => dispatch({ type: 'SET_CAR_MAKE', payload: choice.value })}
            options={carMakeOptions}
          />
        </div>
      </div>

      <br />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h4>Car Model</h4>
        <div style={{ width: '15px' }}/>
        <div style={{ width: '150px' }}>
          <Select 
            value={{ label: state.carModel}}
            onChange={choice => dispatch({ type: 'SET_CAR_MODEL', payload: choice.value })}
            options={carModelOptions}
          />
        </div>
      </div>

    </React.Fragment>
  );
}

export default CarForm
