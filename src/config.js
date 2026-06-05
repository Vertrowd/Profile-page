// API Configuration
export const API_BASE_URL = 'https://profile-page-y0ee.onrender.com';

export const API_ENDPOINTS = {
    SIGNUP: `${API_BASE_URL}/api/auth/signup`,
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    GET_ME: `${API_BASE_URL}/api/auth/me`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
    GET_PROFILE: `${API_BASE_URL}/api/user/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/api/user/profile`,
    UPDATE_PROFILE_IMAGE: `${API_BASE_URL}/api/user/profile-image`,
    DELETE_PROFILE_IMAGE: `${API_BASE_URL}/api/user/profile-image`,
};

export default API_BASE_URL;
