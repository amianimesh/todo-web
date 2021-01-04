import React, {Component} from 'react';
import { addTask } from '../../store/action/taskAction'
import { connect } from 'react-redux'

class AddTask extends Component {
    state = {
        title: '',
        isCompleted: false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addTask(this.state);
        
    }

    render() {
        return(
            <div className='AddTask section container'>
                <form onSubmit={this.handleSubmit}>
                    <h5 className='green-text darken-1'>Add New Task:</h5>
                    <input id='title' type='text' className='materialize-textarea' onChange={this.handleChange}></input>
                    <button className='btn-small grey'>Submit</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addTask: (task) => dispatch(addTask(task))
    }
}

export default connect(null, mapDispatchToProps)(AddTask)