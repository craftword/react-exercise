/* eslint-disable no-script-url */
import React, { useState, useEffect } from 'react';
import SingleDriver from './SingleDriverComponent';
import Title from './Title';

// Generate Order Data

export default function MostPayDriver(props) {
  // const classes = useStyles();
  const [data, setData] = useState();

  async function fetchData() {
    const res = await fetch('api/trips');
    res.json().then(res => setData(res));
  }

  useEffect(() => {
    fetchData();
  }, []);
  /* Helper Function */
  function cleaner(cash) {
    return typeof cash === 'string' ? Number(cash.replace(',', '')) : cash;
  }

  let arrDriversTotalAmount =
    data &&
    data.data.reduce((acc, value) => {
      if (value.driverID.split('-')[0].length === 8) {
        if (typeof acc[value.driverID] == 'undefined') {
          acc[value.driverID] = cleaner(value.billedAmount);
        } else {
          acc[value.driverID] =
            acc[value.driverID] + cleaner(value.billedAmount);
        }
      }
      return acc;
    }, {});

  let arr = [];
  for (var key in arrDriversTotalAmount) {
    // console.log(key, arrDriversNumberTripsInfo[key]);
    if (arr.length === 0) {
      arr.push(key);
      arr.push(arrDriversTotalAmount[key]);
      console.log(arr.length);
    } else {
      if (arr[1] < arrDriversTotalAmount[key]) {
        arr = [];
        arr.push(key);
        arr.push(arrDriversTotalAmount[key]);
      }
    }
  }
  console.log(arr);
  return (
    <React.Fragment>
      <Title>Most Pay Driver</Title>
      <SingleDriver driverId={arr[0]} totalAmount={arr[1]} />
    </React.Fragment>
  );
}
