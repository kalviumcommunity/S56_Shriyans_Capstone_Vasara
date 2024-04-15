import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  const {id} = useParams()
    const navigate = useNavigate()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let handleDelete = () => {
    console.log("delete");
    setOpen(false);
    let loading = toast.loading("Deleting...",{position: "top-center"})
    axios.delete(`${API_URI}/updateprofile/${id}`).then((res) => {
        Cookies.remove('token')
        toast.update(loading,{render:"Account Deleted!",type:"success",isLoading:false,position: "top-center",autoClose: 2000})
        setTimeout(() => {
        navigate('/')
        window.location.reload()
        }
        ,2000)
        console.log(res);
        }
    ).catch((err) => {
        console.log(err);
    }
    )
  }


  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Delete Account
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete User Account"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button autoFocus onClick={handleDelete}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </React.Fragment>
  );
}
