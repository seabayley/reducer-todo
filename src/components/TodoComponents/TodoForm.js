import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import TaskDialog from './TaskDialog';

function TodoForm(props) {
    const [openDialog, setOpenDialog] = useState(false);

    const toggleTaskDialogOpen = () => {
        setOpenDialog(openDialog ? false : true)
    }

    return (
        <div className="todo_form">
            <Button variant='contained'
                color='primary'
                onClick={toggleTaskDialogOpen}>
                <Icon>add</Icon>New Task
            </Button>
            <TaskDialog open={openDialog} onClose={toggleTaskDialogOpen} saveTask={props.handleCreateTask} />
        </div>
    );
}

export default TodoForm;