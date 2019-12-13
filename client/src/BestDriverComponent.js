/* eslint-disable no-script-url */
import React, { useState, useEffect } from 'react';
import SingleDriver from './SingleDriverComponent';
import Title from './Title';

// Generate Order Data
export default function BestDriver(props) {
  // const classes = useStyles();
  const [data, setData] = useState();

  async function fetchData() {
    const res = await fetch('api/trips');
    res.json().then(res => setData(res));
  }

  useEffect(() => {
    fetchData();
  }, []);

  let arrDriversNumberTripsInfo =
    data &&
    data.data.reduce((acc, value) => {
      if (value.driverID.split('-')[0].length === 8) {
        if (typeof acc[value.driverID] == 'undefined') {
          acc[value.driverID] = 1;
        } else {
          acc[value.driverID] += 1;
        }
      }
      return acc;
    }, {});

  // arrDriversNumberTripsInfo.map((e, i) => console.log(i));
  let arr = [];
  for (var key in arrDriversNumberTripsInfo) {
    // console.log(key, arrDriversNumberTripsInfo[key]);
    if (arr.length === 0) {
      arr.push(key);
      arr.push(arrDriversNumberTripsInfo[key]);
    } else {
      if (arr[1] < arrDriversNumberTripsInfo[key]) {
        arr = [];
        arr.push(key);
        arr.push(arrDriversNumberTripsInfo[key]);
      }
    }
  }

  return (
    <React.Fragment>
      <Title>Most Trips Driver</Title>
      <SingleDriver driverId={arr[0]} noOfTrips={arr[1]} />
    </React.Fragment>
  );
}
