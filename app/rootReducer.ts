import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import authenticationReducer from './reducers/authenticationReducer';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    authetication: authenticationReducer,
  });
}
