import { filterJobs } from "../actions/JobActions";
import { FETCH_ALL_JOBS , 
     FETCH_JOBS_SUCCESS,
     FETCH_JOBS_FAILURE,
     FETCH_JOBS_REQUEST,
     FILTER_REQUEST,
     FILTER_ERROR,
     FILTER_SUCCESS,
     EMPTY_FILTERED_JOBS
    
    } from "../actions/Types";

const INITIAL_STATE = {
    jobs:{},
    loadingJobs:false,
    filteredJobs:[],
    loadingFilteredJobs:false,
    filterMessage:''
    
};

const JobReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case FETCH_JOBS_SUCCESS: 
            return { ...state, jobs:action.payload,loadingJobs:false };
        case FETCH_JOBS_FAILURE:
            return { ...state, loadingJobs:false};
        case FETCH_JOBS_REQUEST:

        return { ...state, loadingJobs:true};

        case FILTER_SUCCESS:  
            return { ...state, filteredJobs:action.payload.data,  filterMessage:action.payload.message, loadingFilteredJobs:false };
        case FILTER_ERROR:
            return { ...state, loadingFilteredJobs:false};
        case FILTER_REQUEST:

        return { ...state, loadingFilteredJobs:true};

        case EMPTY_FILTERED_JOBS:
            
        return {...state, filteredJobs:[], filterMessage:"" }


        default:
            return state;
    }
};

export default JobReducer;