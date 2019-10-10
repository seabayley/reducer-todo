import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import StepsDialog from './StepsDialog';

const useStyles = makeStyles({
    taskDialog: {
    },
    taskDialogContent: {
        display: 'flex',
        flexDirection: 'column'
    },
    expandedStepPanel: {
        display: 'flex',
        flexDirection: 'column'
    }
});


export default function TaskDialog(props) {
    const [openSteps, setOpenSteps] = useState(false);
    const [tempTask, setTempTask] = useState({ steps: [] });

    const classes = useStyles();

    const toggleStepsOpen = () => {
        setOpenSteps(openSteps ? false : true)
    }

    const handleTitleChange = e => {
        setTempTask({ ...tempTask, title: e.target.value });
        console.log(tempTask)
    }

    const handleDescChange = e => {
        setTempTask({ ...tempTask, description: e.target.value });
    }

    const handleCloseDialog = () => {
        props.saveTask(tempTask);
        props.onClose();
    }

    return (
        <Dialog
            className={classes.taskDialog}
            open={props.open}
            onClose={props.onClose}>
            <DialogTitle id="task_dialog_title">Create a new Task</DialogTitle>
            <DialogContent className={classes.taskDialogContent}>
                <DialogContentText>Here you can create new tasks, give them a description and even add customs steps to completeion.</DialogContentText>
                <TextField
                    className={classes.taskDialogTitleInput}
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

                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                        <DialogContentText>Steps</DialogContentText>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.expandedStepPanel}>
                        <Button
                            margin='normal'
                            variant='contained'
                            color='primary'
                            onClick={toggleStepsOpen}>
                            Add a step
                        </Button>
                        {tempTask.steps.map(step => {
                            return <p>{step.title}</p>
                        })}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Save</Button>
                <Button>Cancel</Button>
            </DialogActions>
            <StepsDialog open={openSteps}
                onClose={toggleStepsOpen}
                tempTask={tempTask}
                setTempTask={setTempTask}
                toggleStepsOpen={toggleStepsOpen} />
        </Dialog >
    )
}