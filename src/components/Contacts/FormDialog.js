import React from "react";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


const FormDialog = ({
    discardSave, handleSave, open, 
    editContactDetails, setEditContactDetails
  }) => {

  const handleChangeName = (event) => {
    setEditContactDetails({
      ...editContactDetails,
      newName: event.target.value,
    })
  };

  const handleChangeNumber = (event) => {
    setEditContactDetails({
      ...editContactDetails,
      newNumber: event.target.value,
    })
  };

  return (
    <div>
      <Dialog open={open} onClose={discardSave} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Contact</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value = {editContactDetails.newName}
            onChange = {handleChangeName}
          />

          <TextField
            margin="dense"
            id="phone"
            label="Phone"
            type="text"
            fullWidth
            value = {editContactDetails.newNumber}
            onChange = {handleChangeNumber}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={discardSave} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog;
