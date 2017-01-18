import React from 'react';
import { Provider } from 'react-redux';
import { Router,
         Route,
         IndexRoute,
         hashHistory } from 'react-router';

// Components
import App from './app';
import AuthFormContainer from './auth_form/auth_form_container';
import EventForm from './event/event_form_container';
import FavoritePlacesTab from './favorites/favoritePlacesTab';
import FavoritePlaceIndex from './favorites/favoritePlacesIndexContainer';
import FavoritePlaceForm from './favorites/favoritePlaceFormContainer';


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
          <Route path="/new-event" component={ EventForm }/>
          <Route path="/events/:id/edit" component={ EventForm }/>
          <Route path="/favorites" component={ FavoritePlacesTab }>
            <IndexRoute component={ FavoritePlaceIndex } />

          </Route>
        </Route>
      </Router>
    </Provider>
  );
};
// <Route path="/new" component={ FavoritePlaceForm } />
// <Route path="/:id/edit" component={ FavoritePlaceForm } />
export default Root;
