import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    gap: '1rem',
    alignItems: 'center',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '1rem',
  },
  label: {
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    width:'100px',
    padding: '0.5rem',
    fontSize: '1rem',

  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
    width: '200px',  // Adjust this width as needed
  },
};

export default function EditModal({props}) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const id = props;
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    handleClose();
  };
  let [firstName,setFirstName] = React.useState("");
  let [lastName,setLastName] = React.useState("");
  let [role,setRole] = React.useState("");
  let [email,setEmail] = React.useState("");

  React.useEffect(() => {
    axios.get(`${API_URI}/profile/${id}`).then((res) => {
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setRole(res.data.role);
      setEmail(res.data.email);
    });
  }
  , [props]);


  const handleUpdate = () => {
    axios.put(`${API_URI}/updateProfile/${id}`,{
      firstName:firstName,
      lastName:lastName,
      role:role,
      email:email
    }).then((res) => {
      // console.log(res)
      toast.success("User Data Updated",{position: "top-center",autoClose: 2000})
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <React.Fragment>
      <EditIcon onClick={handleClickOpen('paper')} style={{marginRight:"5px"}}/>
      {/* <Button onClick={handleClickOpen('paper')}><EditIcon/></Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
      >
        <DialogTitle id="scroll-dialog-title">Update</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <form onSubmit={handleSubmit} style={styles.form} id="subscribe-form">
            <div style={styles.inputGroup}>
              <label htmlFor="firstName" style={styles.label}>First Name</label>
              <input type="text" name="firstName" style={styles.input} value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="lastName" style={styles.label}>Last Name</label>
              <input type="text" id="lastName" name="lastName" style={styles.input} value={lastName} onChange={(e)=>setLastName(e.target.value)} />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="role" style={styles.label}>Role</label>
              <input type="text" id="role" name="role" style={styles.input} value={role} onChange={(e)=>setRole(e.target.value)}/>
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.label}>Email</label>
              <input type="email" id="email" name="email" style={styles.input} value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button type="submit" form="subscribe-form" variant="contained" color="primary" onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </React.Fragment>
  );
}
