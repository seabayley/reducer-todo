import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));

function Todo(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());

    const className = 'todo';

    if (props.todo.completed) {
        className += ' todo-completed'
    }

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!(props.todo.steps[activeStep].optional)) {
            throw new Error("You can't skip a step that isn't optional.");
        }
    }

    const handleReset = () => {
        setActiveStep(0);
    };

    const isStepSkipped = step => {
        return skipped.has(step);
    };

    const isStepOptional = step => {
        return step.optional
    }

    return (
        <ExpansionPanel className='todo_panel'>
            <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                <div className={className}>
                    <h2 >{props.todo.title}</h2>
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <DialogContent>
                    <DialogContentText>
                        {props.todo.description}
                    </DialogContentText>
                </DialogContent>
                <div className={classes.root}>
                    <Stepper activeStep={activeStep} orientation='vertical'>
                        {props.todo.steps.map((step, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            if (isStepOptional(step)) {
                                labelProps.optional = <Typography variant="caption">Optional</Typography>;
                            }
                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step key={step.title} {...stepProps}>
                                    <StepLabel {...labelProps}>{step.title}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    <div>
                        {activeStep === props.todo.steps.length ? (
                            < div >
                                <Typography className={classes.instructions}>
                                    All steps completed - you're finished</Typography>
                                <Button onClick={handleReset} className={classes.button}>
                                    Reset</Button>
                            </div>
                        ) : (
                                <div>
                                    <Typography className={classes.instructions}>{props.todo.steps[activeStep].description}</Typography>
                                    <div>
                                        <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                            Back</Button>
                                        {isStepOptional(props.todo.steps[activeStep]) && (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleSkip}
                                                className={classes.button}
                                            >
                                                Skip</Button>
                                        )}

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === props.todo.steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel >
    );
}

export default Todo;