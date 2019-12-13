/* eslint-disable no-script-url */
import React, { useState, useEffect } from 'react';
//import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Title from './Title';
import axios from 'axios';

// Generate Order Data

export default function VehicleDetails(props) {
  const [data, setData] = useState();

  async function fetchData() {
    const res = await fetch('api/vehicle/' + props.vehicleId);
    res.json().then(res => setData(res));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Title>Best Driver</Title>
    </React.Fragment>
  );
}
