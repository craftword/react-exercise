import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: '10px 5px 10px 10px',
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('api/driver/' + props.driverId);
      setData(result.data);
    };
    fetchData();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Click
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Avatar
                alt="driver image"
                src={data && data.data.photo}
                className={classes.bigAvatar}
              />
              {/* {console.log(data && data.data.photo)}
               */}
            </Grid>
            <Grid item xs={6}>
              <h3>{data && data.data.name} </h3>
              <strong>Gender :</strong> {data && data.data.gender} <br />
              <strong>Agent :</strong> {data && data.data.agent} <br />
            </Grid>
            <Grid item xs={12}>
              <strong>Email : </strong>
              {data && data.data.email} <br />
              <strong>Phone :</strong> {data && data.data.phone} <br />
              <strong>Date Of Birth :</strong>{' '}
              {data && data.data.DOB.slice(0, 10)} <br />
              <strong>Number Of Vehicle :</strong>{' '}
              {data && data.data.vehicleID.length} <br />
              <strong>Address:</strong> {data && data.data.address}
            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  );
}
