import React, {Component} from 'react';
import { connect } from 'react-redux'
import { signup } from '../../store/action/authAction'
import { Redirect } from 'react-router-dom'

class SignUp extends Component {
    state = {
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signup(this.state)
    }

    handleChange= (e) => {
        console.log(e);
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        const { authError, auth } = this.props;
        if (auth.uid) return <Redirect to= '/' />
        
        return(
            <div className='container'>
                <form onSubmit={this.handleSubmit}>
                    <h5>Sign Up</h5>

                    <div className='input-field'>
                        <label htmlFor='firstname'>First Name</label>
                        <input type='text' id='firstname' onChange={this.handleChange}></input>
                    </div>

                    <div className='input-field'>
                        <label htmlFor='firstname'>Last Name</label>
                        <input type='text' id='lastname' onChange={this.handleChange}></input>
                    </div>
                    
                    <div className='input-field'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' onChange={this.handleChange}></input>
                    </div>

                    <div className='input-field'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' onChange={this.handleChange}></input>
                    </div>

                    <div>
                        <button className='btn'>Sign Up</button>
                        <div className='red-text center'>
                            { authError ? <p>{ authError }</p> : null }
                        </div>
                    </div>
                </form>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}


const mapDispatchToProps = (dispatch) => {
    return{
        signup: (newuser) => dispatch(signup(newuser))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUp)