/* eslint-disable no-script-url */
import React, { useState, useEffect } from 'react';
//import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

// Generate Order Data

const useStyles = makeStyles(theme => ({
  bigAvatar: {
    width: 130,
    height: 130,
  },
}));

export default function SingleDriver(props) {
  const classes = useStyles();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('api/driver/' + props.driverId);
      setData(result.data);
    };
    fetchData();
  });

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Avatar
            alt="driver image"
            src={
              props.noOfTrips
                ? 'http://probation.gov.ph/wp-content/uploads/2018/09/Awards.png'
                : 'https://image.freepik.com/free-photo/dollar-sign-symbol_2227-466.jpg'
            }
            className={classes.bigAvatar}
          />
          {/* {console.log(data && data.data.photo)}
           */}
        </Grid>
        <Grid item xs={8}>
          <h3>{data && data.data.name} </h3>
          <strong>Gender :</strong> {data && data.data.gender} <br />
          <strong>Email : </strong>
          {data && data.data.email} <br />
          <strong>Phone :</strong> {data && data.data.phone} <br />
          <strong>
            {props.noOfTrips ? 'Number Of Trips' : 'Total Amount'}
          </strong>{' '}
          {props.noOfTrips ? props.noOfTrips : props.totalAmount} <br />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
