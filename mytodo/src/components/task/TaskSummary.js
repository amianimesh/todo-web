import React, { Component } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { deletetask, updatetask } from '../../store/action/taskAction'
import moment from 'moment';




class TaskSummary extends Component {
    render() {
        const { task, dispatchDeletetask, dispatchUpdateTask } = this.props;


        return(
            <div className='card z-depth-0'>
                <div className='card-content'>
                    <span className='card-title' style={task.isCompleted ? {'text-decoration': 'line-through'} : {}}> {task.title} </span>
                    <div className='card-action grey lighten-4'>
                        <p>{ moment(task.createdOn.toDate()).calendar() }</p>
                        <p>Due Date</p>
                    </div>
                    <button className='btn-small red ' onClick={e=>dispatchDeletetask(e, task.id)}>Delete</button>
                    <button className='btn-small green right' onClick={e => dispatchUpdateTask(e, task.id)} >Completed</button>
                </div>
            </div>
        )
    }
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
            dispatch(deletetask(id))},

        dispatchUpdateTask: (e, id) => {
            e.preventDefault();
            dispatch(updatetask(id))
        }
    }
}

export default compose(
    connect(null, matchDispatchToProps),
    firestoreConnect([
        { collection: 'tasks' }
    ]))
    (TaskSummary)