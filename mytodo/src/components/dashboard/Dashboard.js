import React, { Component } from "react";
import AddTask from '../task/AddNewTask'
import TaskList from '../task/TaskList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {
    render() {
        const { tasks, auth } = this.props;
        if (!auth.uid) return <Redirect to= '/signin' />
        
        return(
            <div className='dashboard container'>
                <div className='row'>
                    <div className='col s12 m6'>
                        <TaskList tasks={ tasks }/>
                    </div>
                    <div className='col s12 m5'>
                        <AddTask />
                    </div>
                </div>
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    console.log(state);
    return{
        tasks: state.firestore.ordered.tasks,
        auth: state.firebase.auth
    }
}


export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'tasks' }
    ])
)(Dashboard)