import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOAD_PROFILE_SUCCESS,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  SIGNUP_REQUEST,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  FIND_INFO_REQUEST,
  FIND_INFO_SUCCESS,
  FIND_INFO_FAILED,
  FETCH_CUSTOMER_SUCCESS,
  FETCHING_CUSTOMERS,
} from "../actions/Types";

const INITIAL_STATE = {
  loading: false,
  authError: "",
  authenticating: false,
  profile: {},
  currentRole: null,
  loggingout: false,
  signupLoad: false,
  signupError: "",
  loadingUserInfo: false,
  userInfo: {},
  loading:false,
  customers:[],
  loadingCustomers:false
};

const AppReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, authenticating: true, authError: null };
    case LOGIN_SUCCESS:
      // Save the profile in local storage
      localStorage.setItem("userProfile", JSON.stringify(action.payload.user));
      localStorage.setItem("currentRole", action.payload.currentRole);
      console.log("PAYLOAD", action.payload.currentRole);
      return { ...state, authenticating: false, profile: action.payload.user };

    case SIGNUP_REQUEST:
    return { ...state, loading: true  };
    case SIGNUP_SUCCESS:
      return { ...state, signupLoad: false };
    case SIGNUP_FAILURE:
      return { ...state, signupLoad: false, signupError: action.payload };

    case LOAD_PROFILE_SUCCESS:
      return { ...state, profile: action.payload };

    case LOGOUT:
      return { ...state, profile: {}, authenticating: false, loggingout: true };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("userProfile"); // Clear profile from local storage
      localStorage.removeItem("currentRole");
      return { ...state, loggingout: false };
    case LOGOUT_FAILED:
      return { ...state, loggingout: false };

    case LOGIN_FAILURE:
      return { ...state, authenticating: false, authError: action.payload };

    case FIND_INFO_SUCCESS:
      return { ...state, loadingUserInfo: false, userInfo: action.payload };
    case FIND_INFO_FAILED:
      return { ...state, loadingUserInfo: false };

    case FIND_INFO_REQUEST:
      return { ...state, loadingUserInfo: true };

    case FETCHING_CUSTOMERS: 
    return { ...state, loadingCustomers: true };

    case FETCH_CUSTOMER_SUCCESS: 
    return { ...state, loadingCustomers: false , customers:action.payload};
    default:
      return state;
  }
};

export default AppReducer;
