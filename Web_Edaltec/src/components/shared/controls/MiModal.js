 

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { modalClose } from '../../../redux/slice/modalSlice';  


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h5">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

////---- maxWidth = "xs" , "sm", "md","lg","xl"

export default function MiModal({  fullWidth, maxWidth, children }) { 

  const dispatch = useDispatch(); 

  const handleClose = () => {
    dispatch(modalClose())
  };

  const  { showModal, titleModal } = useSelector(state => state.modal);

  return (
    <div> 
      <Dialog   fullWidth={fullWidth} maxWidth={maxWidth}  aria-labelledby="customized-dialog-title" open={showModal}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            {titleModal}
        </DialogTitle>
        <DialogContent dividers>
            {children}
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="contained"  onClick={handleClose} color="secondary" >
             Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
