export const addTask = (task) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        //async call
        const firestore = getFirestore();
        firestore.collection('tasks').add({
            ...task,
            createdOn: new Date()
        }).then(() => {
            dispatch({type: 'ADD_TASK', task: task})
        }).catch((err) => {
            dispatch({type: 'CREATING_TASK_ERR', err: err})
        })
    }
}

export const deletetask = (id) => {
    return(dispatch, getState, {getFirestore}) => {
      const firestore = getFirestore();

      firestore.collection('tasks').doc(id).delete().then(() => {
          dispatch({ type: 'DELETE_TASK_SUCCESS' });
        }).catch(err => {
          dispatch({ type: 'DELETE_TASK_ERROR', err });
        })
    }
}

export const updatetask = (task) => {

}