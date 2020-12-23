import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/reducers/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createFirestoreInstance, reduxFirestore, getFirestore } from 'redux-firestore'
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase'
import fbConfig from './config/fbConfig'
import firebase from 'firebase/app'
//for render on auth ready
import { useSelector  } from 'react-redux'
import { isLoaded  } from 'react-redux-firebase';
import { BrowserRouter, Route } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'




const store = createStore(rootReducer, 
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase, fbConfig),
    )
);

const profileSpecificProps = {
  useFirestoreForProfile: true,
  userProfile: 'users',
}

const reactReduxFirebaseProps = {
  firebase ,
  config: fbConfig,
  config: profileSpecificProps,
  dispatch: store.dispatch,
  createFirestoreInstance
}

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <BrowserRouter><Route exact path='/' component={Dashboard} /></BrowserRouter>
      return children
}

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}> 
  <ReactReduxFirebaseProvider {...reactReduxFirebaseProps}>
  <AuthIsLoaded>  
    <App />
  </AuthIsLoaded> 
  </ReactReduxFirebaseProvider>  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
