import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlockIcon from '@mui/icons-material/Block';
import axios from 'axios';

export default function BlockModal({props}) {
  const [open, setOpen] = React.useState(false);
  const id = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const handleBlock = () => {
        axios.delete(`http://localhost:3001/blockuser/${id}`).then((res) => {
                toast.success("User Blocked Successfully",{position: "top-center",autoClose: 2000})
                setOpen(false);
        }
        ).catch((err) => {
            toast.error("Error in Blocking User",{position: "top-center",autoClose: 2000})
        }
        )
    }
  return (
    <React.Fragment>
      <BlockIcon onClick={handleClickOpen}/>
      {/* <Button variant="outlined" style={{border:"none",padding:0, color:"black"}} onClick={handleClickOpen}>
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Block User"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to block this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button autoFocus onClick={handleBlock}>
            Block
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </React.Fragment>
  );
}

