import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles({
    stepsDialogContent: {
        display: 'flex',
        flexDirection: 'column'
    }
});

export default function StepsDialog(props) {
    const [optional, setOptional] = useState(false);
    const [stepList, setStepList] = useState([]);
    const [step, setStep] = useState({});

    const classes = useStyles();

    const toggleOptional = () => {
        setOptional(optional ? false : true)
        setStep({ ...step, optional: optional })
    }

    const handleTitleChange = e => {
        setStep({ ...step, title: e.target.value });
    }

    const handleDescChange = e => {
        setStep({ ...step, description: e.target.value });
    }

    const saveStep = () => {
        setStep({ ...step, completed: false })
        props.setTempTask({ ...props.tempTask, steps: [...props.tempTask.steps, step] })
        props.toggleStepsOpen();
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}>
            <DialogTitle>Create a new step</DialogTitle>
            <DialogContent className={classes.stepsDialogContent}>
                <DialogContentText>Here you can create new steps for task completion.</DialogContentText>
                <TextField
                    margin='normal'
                    variant='outlined'
                    label="Title"
                    onChange={event => handleTitleChange(event)} />
                <TextField
                    margin='normal'
                    variant='outlined'
                    label='Description'
                    multiline
                    rows='4'
                    onChange={event => handleDescChange(event)} />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={optional}
                            onChange={toggleOptional}
                            value="optional"
                            color="primary"
                        />
                    }
                    label="Optional Step"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={saveStep}>Save</Button>
                <Button onClick={props.toggleStepsOpen}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}