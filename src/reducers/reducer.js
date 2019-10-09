const reducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_INPUT':
            return {
                ...state,
                input: action.payload
            }
        case 'ADD_TODO':
            return {
                ...state,
                todoList: [...state.todoList, action.payload]
            }
        case 'TOGGLE_TASK_COMPLETE':
            console.log('test')
            return {
                ...state,
                todoList: state.todoList.map(todo => {
                    if (todo.id === action.payload.id) {
                        return {
                            ...todo,
                            completed: !todo.completed
                        }
                    }
                    else {
                        return todo
                    }
                })
            }
        case 'CLEAR_COMPLETED_TODOS':
            return {
                ...state,
                todoList: state.todoList.filter(todo => {
                    return (!todo.completed)
                })
            }
        case 'CLEAR_ALL_TODOS':
            return {
                ...state,
                todoList: []
            }
        default:
            return state;
    }
}

export default reducer