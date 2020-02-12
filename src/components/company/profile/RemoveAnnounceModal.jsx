import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { removeAnnounce } from '../../../actions/companyAuth'
import { getCookie } from '../../../actions/auth';
const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minWidth: 350,
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    '& > div': {
      flex: 1,
      width: '100%',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      '& > button': {
        marginLeft: 10
      }
    }
  },
}));

const RemoveAnnounceModal = ({ handleClose, handleOpen, open: { status, _id }, setError }) => {
  const classes = useStyles();
  const handleRemove = () => {
    return removeAnnounce(getCookie('token'), _id).then(res => {
      if (res.error) {
        return setError(res.error)
      }
      setError('')
      handleClose()
    })
  }
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={status}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={status}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title" style={{ width: '100%', textAlign: 'left' }}>Remove !</h2>
            <div style={{ justifyContent: 'center' }}>
              remove this announce !!!
            </div>
            <div>
              <Button variant="outlined" onClick={handleClose} color="secondary" >Cancel</Button>
              <Button variant="outlined" color="primary" onClick={handleRemove} >Remove</Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default RemoveAnnounceModal;
