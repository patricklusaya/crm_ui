import {
  FETCH_APPLICATIONS_SUCCESS,
  FETCH_APPLICATIONS_FAILURE,
  FETCH_APPLICATIONS_REQUEST,
  FETCH_APPLICANTS_REQUEST,
  FETCH_APPLICANTS_SUCCESS,
  FETCH_APPLICANTS_FAILURE,

  FETCH_SEEKER_APPLICATIONS_REQUEST,
  FETCH_SEEKER_APPLICATIONS_SUCCESS,
  FETCH_SEEKER_APPLICATIONS_FAILURE
} from "../actions/Types";

const INITIAL_STATE = {
  loading: false,
  applications: [],
  fetchError:'',
  loadingApplicants:false,
  jobApplications:[],
  seekerApplications:[],
  loadingSeekerApplications:false
};

const ApplicationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_APPLICATIONS_REQUEST: console.log('payload')
     return { ...state, loading: true, fetchError: '' };
    case FETCH_APPLICATIONS_SUCCESS:
    return { ...state, loading: false, applications: action.payload };
    case FETCH_APPLICATIONS_FAILURE:
    return { ...state, loading: false, fetchError:action.payload };
    case FETCH_APPLICANTS_REQUEST:
     return { ...state, loadingApplicants: true,};
    case FETCH_APPLICANTS_SUCCESS:
    return { ...state, loadingApplicants: false, jobApplications: action.payload };
    case FETCH_APPLICANTS_FAILURE:
    return { ...state, loadingApplicants: false, };

    case FETCH_SEEKER_APPLICATIONS_REQUEST:
    return { ...state, loadingSeekerApplications: true,};
    case  FETCH_SEEKER_APPLICATIONS_SUCCESS:
    return { ...state, loadingSeekerApplications: false, seekerApplications: action.payload };
    case FETCH_SEEKER_APPLICATIONS_FAILURE:
    return { ...state, loadingSeekerApplications: false};


    default:
      return state;
  }
};

export default ApplicationReducer;
