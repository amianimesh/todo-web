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

export const updatetask = (id) => {
    return(dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();

        firestore.collection('tasks').doc(id).get().then((doc) => {
            if (doc.exists) {
                return doc.ref.update({ isCompleted: !doc.data().isCompleted });
            } else {
                // ghgh
            }
        }).then(() => {
            dispatch({type: 'UPDATE_SUCCESS'});
        }).catch((err) => {
            dispatch({type: 'ERR_UPDATING'});
        })
    }
}


/*.doc(id)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          return doc.ref.update({ completed: !doc.data().completed });
        } else {
          // Throw an error
        }
      })
      .then(function () {
        console.log('Todo successfully updated!');
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error('Error updating todo: ', error);
      });
  };*/