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
import SimpleModal from './ModalComponent';

// Generate Order Data

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function AllTrips(props) {
  const classes = useStyles();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('api/trips');
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Title>All Trips</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Iscash</TableCell>
            <TableCell>Billed Amount</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Pick up</TableCell>
            <TableCell>Destination</TableCell>
            <TableCell>Driver Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.data.slice(0, props.count).map(item => (
              <TableRow key={item.tripID}>
                {/* <TableCell>{item.driverID}</TableCell> */}
                <TableCell>{item.isCash ? 'Cash' : 'Non Cash'}</TableCell>
                <TableCell>{item.billedAmount}</TableCell>
                <TableCell>{item.user.name}</TableCell>
                <TableCell>{item.pickup.address}</TableCell>
                <TableCell>{item.destination.address}</TableCell>
                <TableCell>
                  <SimpleModal driverId={item.driverID} />
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
