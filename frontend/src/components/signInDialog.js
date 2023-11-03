import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


export default function SignInDialog({openDialog, setOpenDialog})
{
    const navigate = useNavigate();
    return (
        <div>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogContent>
                <DialogContentText>
                    You are not logged in, please log in first.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenDialog(false)}>Close</Button>
                <Button onClick={() => navigate('/login')} color="primary">
                    Log in
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    )
}