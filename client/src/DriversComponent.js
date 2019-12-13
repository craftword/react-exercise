/* eslint-disable no-script-url */
import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import axios from 'axios';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';

// Generate Order Data

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function AllDrivers() {
  const classes = useStyles();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('api/drivers');
      setData(result.data);
    };
    fetchData();
  }, []);

  console.log(data);

  return (
    <React.Fragment>
      <Title>All Drivers</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Driver Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Agent</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Vehicle</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.data.map(item => (
              <TableRow key={item.driverID}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.gender}</TableCell>
                <TableCell>{item.agent}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.DOB.slice(0, 10)}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>
                  {item.vehicleID.length} X <DirectionsCarIcon />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="javascript:;">
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
