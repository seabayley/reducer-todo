import React, { useReducer } from 'react';

import './components/TodoComponents/Todo.css'

import TodoList from './components/TodoComponents/TodoList';
import TodoForm from './components/TodoComponents/TodoForm';
import Reducer from './reducers/reducer';

const initialState = {
  todoList: [{
    title: 'Your first task!',
    description: 'Use the task tracker to create a new task and even add some steps',
    id: Date.now(),
    steps: [{
      title: 'Complete your first step.',
      description: 'This is a description of a step.',
      completed: false,
      optional: true
    },
    {
      title: 'Complete your second step.',
      description: 'This is a description of a step.',
      completed: false,
      optional: false
    },
    {
      title: "Complete your third step, if you'd like",
      description: 'This is a description of a step.',
      completed: false,
      optional: true
    },
    {
      title: 'Complete your final step.',
      description: 'This is a description of a step.',
      completed: false,
      optional: false
    }
    ],
    completed: false
  }]
}

const App = () => {
  const [state, dispatch] = useReducer(Reducer, initialState)

  const handleInputChange = e => {
    dispatch({ type: 'CHANGE_INPUT', payload: e.target.value })
  }

  const handleCreateTask = task => {
    task.id = Date.now();
    task.completed = false;
    dispatch({ type: 'ADD_TODO', payload: task })
  }

  const toggleTaskComplete = task => {
    dispatch({ type: 'TOGGLE_TASK_COMPLETE', payload: task })
  }

  const handleClearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED_TODOS' })
  }

  const handleClearAll = () => {
    dispatch({ type: 'CLEAR_ALL_TODOS' })
  }

  return (
    <div className="App">
      <header>
        <h1> taskTracker </h1>
      </header>
      <div className="todo_wrapper">
        <TodoList todos={state.todoList} toggleTaskComplete={toggleTaskComplete} />
        <TodoForm
          handleInputChange={handleInputChange}
          handleClearCompleted={handleClearCompleted}
          handleClearAll={handleClearAll}
          handleCreateTask={handleCreateTask} />
      </div>
    </div>
  );
}

export default App;