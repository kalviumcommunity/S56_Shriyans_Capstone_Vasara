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
    width: '200px',
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
    handleClose();
  };
  let [name,setName] = React.useState("");
  let [verified,setVerified] = React.useState("");

  React.useEffect(() => {
    axios.get(`${API_URI}/findColor/${id}`).then((res) => {
      setName(res.data.name);
      setVerified(res.data.status);
    }).catch((err) => {
      console.log(err)
    }
    )

  }
  , [props]);


  const handleUpdate = () => {
    axios.put(`${API_URI}/findColor/${id}`,{
      status: verified
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
              <label htmlFor="Name" style={styles.label}>Name</label>
              <input type="text" name="Name" style={styles.input} value={name} disabled onChange={(e)=>setName(e.target.value)} />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="verified" style={styles.label}>Status</label>
              {/* <input type="text" id="verified" name="verified" style={styles.input} value={verified} onChange={(e)=>setVerified(e.target.value)} /> */}
              <label>
                <input
                    type="radio"
                    id="verifiedYes"
                    name="verified"
                    value="verified"
                    checked={verified === "verified"}
                    onChange={(e) => setVerified(e.target.value)}
                />
                Yes
            </label>
            <label>
                <input
                    type="radio"
                    id="verifiedNo"
                    name="verified"
                    value="not verified"
                    checked={verified === "not verified"}
                    onChange={(e) => setVerified(e.target.value)}
                />
                No
            </label>
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
