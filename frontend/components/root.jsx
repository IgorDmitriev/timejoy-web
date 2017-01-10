import React from 'react';
import { Provider } from 'react-redux';
import { Router,
         Route,
         IndexRoute,
         hashHistory } from 'react-router';

// Components
import App from './app';
import AuthFormContainer from './auth_form/auth_form_container';


const Root = ({ store }) => {

  const _ensureLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (!currentUser) {
      replace('/login');
    }
  };

  const _redirectIfLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (currentUser) {
      replace('/');
    }
  };

  return (
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route path="/login" component={ AuthFormContainer }
          onEnter={ _redirectIfLoggedIn } />

        <Route path="/" component={ App }
          onEnter={ _ensureLoggedIn }>


        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
