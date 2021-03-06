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
export const createTop5List = (payload) => api.post(`/top5list/`, payload);
export const getAllTop5Lists = () => api.get(`/top5lists/`);
export const getTop5ListPairs = () => api.get(`/top5listpairs/`);
export const getTop5ListPairsByUsername = (username) => api.get(`/top5listpairs/${username}`);
export const likeTop5List = (username, id) => api.put(`/top5list/like/${username}/${id}`);
export const dislikeTop5List = (username, id) => api.put(`/top5list/dislike/${username}/${id}`);
export const viewTop5List = (id) => api.put(`/top5list/view/${id}`);
export const commentTop5List = (username, id, payload) => api.put(`/top5list/comment/${username}/${id}`, payload);
export const updateTop5ListById = (id, payload) => api.put(`/top5list/${id}`, payload);
export const publishTop5List = (id) => api.put(`/top5list/publish/${id}`);
export const deleteTop5ListById = (id) => api.delete(`/top5list/${id}`);
export const getTop5ListById = (id) => api.get(`/top5list/${id}`);
export const getPublishedTop5Lists = () => api.get(`/top5listspublished`);
export const getPublishedTop5ListByUsername = (username, name) => api.get(`/top5list/${username}/${name}`);
export const getPublishedTop5ListsByUsername = (username) => api.get(`/top5lists/${username}`);
export const getListByString = (query, flag,username) => api.get(`/top5listquery/${query}/${flag}/${username}`);

export const getCommunityLists = () => api.get(`/communitylists/`);
export const viewCommunityList = (id) => api.put(`/communitylist/view/${id}`);
export const dislikeCommunityList = (username, id) => api.put(`/communitylist/dislike/${username}/${id}`);
export const likeCommunityList = (username, id) => api.put(`/communitylist/like/${username}/${id}`);
export const commentCommunityList = (username, id, payload) => api.put(`/communitylist/comment/${username}/${id}`, payload);
export const getCommunityListByString = (query) => api.get(`/communitylist/${query}`);




export const getLoggedIn = () => api.get(`/loggedIn/`);
export const registerUser = (payload) => api.post(`/register/`, payload);
export const loginUser = (payload) => api.post(`/login/`, payload);
export const logoutUser = () => api.get(`/logout/`);

const apis = {
    createTop5List,
    getAllTop5Lists,
    getTop5ListPairs,
    getTop5ListPairsByUsername,
    getPublishedTop5ListByUsername,
    getPublishedTop5ListsByUsername,
    getPublishedTop5Lists,
    getCommunityLists,
    viewCommunityList,
    publishTop5List,
    getListByString,
    getCommunityListByString,
    updateTop5ListById,
    deleteTop5ListById,
    getTop5ListById,
    likeTop5List,
    likeCommunityList,
    dislikeTop5List,
    dislikeCommunityList,
    viewTop5List,
    commentTop5List,
    commentCommunityList,
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser
};

export default apis;
