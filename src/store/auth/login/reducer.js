import { CHECK_LOGIN, LOGIN_USER_SUCCESSFUL, LOGIN_FAILED, CHECK_OTP,LOGIN_ERROR_CLEAR, VALIDATE_OTP_SUCCESS, VALIDATE_OTP_ERROR, LOGOUT_USER, REFRESH_TOKEN } from './actionTypes';

const initialState = {
    loginError: null, message: null, loading: null
}

const login = (state = initialState, action) => {
    switch (action.type) {       
        case CHECK_LOGIN:
            state = {
                ...state,
                user: null,
                loading: true,
                loginError: null
            }
            break;
        case LOGIN_USER_SUCCESSFUL:
            state = {
                ...state,
                user: action.payload,
                loading: false,
                loginError: null
            }
            break;
        case LOGIN_FAILED:
            state = {
                ...state,
                loading: false,
                loginError: action.payload
            }
            break;

        case CHECK_OTP:
            state = {
                ...state,
                user: null,
                validate_otp_success: false,
                validate_otp_error: false,
            }
            break;

        case VALIDATE_OTP_SUCCESS:
            state = {
                ...state,
                validate_otp_success: action.payload,
                validate_otp_error: false,
            }
            break;

        case VALIDATE_OTP_ERROR:
            state = {
                ...state,
                validate_otp_success: false,
                validate_otp_error: action.payload,
            }
            break;
        case LOGIN_ERROR_CLEAR:
            state = {
                ...state,
                loginError: null,
                user: null,
            }
            break;
        case LOGOUT_USER:
            state = {
                ...state,
                user: null,
            }
            break;
        case REFRESH_TOKEN:
            state = {
                ...state,
                user: {
                    ...state.user,                   
                    token: action.payload.newToken,
                    refreshToken: action.payload.newRefreshToken                    
                }                
            }
            break;
        default:
            // state = { ...state };
            break;
    }
    return state;
}

export default login;