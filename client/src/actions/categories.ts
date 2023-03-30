import * as api from '../api/index'
import { FETCH_CATEGORIES } from '../utils/constants/actionTypes';


export const getCategories: any = () => async (dispatch: any) => {
  try {
    const data = await api.fetchCategories()
    const json = await data.json()
    dispatch({ type: FETCH_CATEGORIES, payload: json.categories });
  } catch (error) {
    console.error(error)
  }
}