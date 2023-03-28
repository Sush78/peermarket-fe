import { FETCH_CATEGORIES } from "../utils/constants/actionTypes";

export default (categories = [], action: any) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return action.payload;
    default:
      null
  }
}