import * as api from '../api/index'
import { FETCH_CATEGORIES } from '../utils/constants/actionTypes';


export const getCategories: any = () => async (dispatch: any) => {
  try {
    const categories = await api.fetchCategories()
    console.log(categories)
    dispatch({ type: FETCH_CATEGORIES, payload: categories });
  } catch (error) {
    console.error(error)
  }
}

/* import { ThunkAction } from 'redux-thunk'; 
import { RootState } from './store';
 export const fetchUser: ThunkAction<void, RootState, null, AnyAction> = () => { return async (dispatch) => {    // Async code here  };}; */