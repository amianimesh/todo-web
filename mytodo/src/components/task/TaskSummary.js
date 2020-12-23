import React from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { deletetask } from '../../store/action/taskAction'
import moment from 'moment';




const TaskSummary = (props) => {
    const { task, dispatchDeletetask } = props;
    return(
        <div className='card z-depth-0'>
            <div className='card-content'>
                <span className='card-title'>{task.title} </span>
                <div className='card-action grey lighten-4'>
                    <p>{ moment(task.createdOn.toDate()).calendar() }</p>
                    <p>Due Date</p>
                </div>
                <button className='btn-small red' onClick={e=>dispatchDeletetask(e, task.id)}>Delete</button>
            </div>
        </div>
    )
}

/*const mapStateToProps = (state, ownProps) => {
    
    const tasks = state.firestore.data.projects;
    const task = tasks ? tasks[{}] : null
    return {
        task: task,
    }
}*/

const matchDispatchToProps = (dispatch) => {
    return {
        dispatchDeletetask: (e, id) => {
            e.preventDefault();
            dispatch(deletetask(id))
        }
    }
}

export default compose(
    connect(null, matchDispatchToProps),
    firestoreConnect([
        { collection: 'tasks' }
    ]))
    (TaskSummary)