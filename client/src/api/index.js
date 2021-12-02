import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /top5list). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE CALL THE payload, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES
export const createTop5List = (payload) => api.post(`/top5list/`, payload)
export const getAllTop5Lists = () => api.get(`/top5lists/`)
export const getTop5ListPairs = () => api.get(`/top5listpairs/`)
export const getTop5ListPairsByUsername = (username) => api.get(`/top5listpairs/${username}`)
export const updateTop5ListById = (id, payload) => api.put(`/top5list/${id}`, payload)
export const publishTop5List = (id) => api.put(`/top5list/publish/${id}`)
export const deleteTop5ListById = (id) => api.delete(`/top5list/${id}`)
export const getTop5ListById = (id) => api.get(`/top5list/${id}`)
export const getPublishedTop5ListsByUsername = (username, name) => api.get(`/top5list/${username}/${name}`)

export const getLoggedIn = () => api.get(`/loggedIn/`);
export const registerUser = (payload) => api.post(`/register/`, payload);
export const loginUser = (payload) => api.post(`/login/`, payload)
export const logoutUser = () => api.get(`/logout/`)

const apis = {
    createTop5List,
    getAllTop5Lists,
    getTop5ListPairs,
    getTop5ListPairsByUsername,
    getPublishedTop5ListsByUsername,
    publishTop5List,
    updateTop5ListById,
    deleteTop5ListById,
    getTop5ListById,

    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser
}

export default apis
