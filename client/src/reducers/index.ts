import { combineReducers } from 'redux';
import user from '../slices/user';
import categories from './categories';

export const reducers = combineReducers({
  categories,
  user
});