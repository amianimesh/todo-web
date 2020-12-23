import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signout } from '../../store/action/authAction'

const SignedInLinks = (props) => {
    const { profile } = props;
    return(
        <ul className='right'>
            <li> <a onClick={props.signout}>Sign Out</a></li>
            <li><Link to='/' className='btn btn-floating green lighten-3 black-text'>{ profile.initials }</Link></li>
        </ul>
    )
}

const mapStateToProps = (state) => {
    return{
        profile: state.firebase.profile
    }
}


const mapDispatchToProps = (dispatch) => {
    return{
        signout: () => dispatch(signout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks)