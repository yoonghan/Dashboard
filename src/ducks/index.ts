import { combineReducers } from 'redux';
import * as StoreFetch from './StoreFetch';

export default combineReducers({
  store: StoreFetch.reducer
});
