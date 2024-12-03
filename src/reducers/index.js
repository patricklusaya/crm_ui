import { combineReducers } from 'redux';

//-> reducers imports
import AppReducer from "./AppReducer"
import JobReducer from './JobReducer';
import ApplicationReducer from './ApplicationReducer';


export default combineReducers({
    app: AppReducer,
    jobs:JobReducer,
    applications:ApplicationReducer
   
});