const initState = {
    tasks: [
        
    ]
}

const taskReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            console.log('task added', action.task);
            return state;
        case 'CREATING_TASK_ERR':
            console.log('creating task err', action.err);
            return state;
        case 'DELETE_TASK_SUCCESS':
            console.log('task deleted');
            return state;
        case 'DELETE_TASK_ERROR':
            console.log('task delete error');
            return state;
        default:
            return state;
    }
}

export default taskReducer