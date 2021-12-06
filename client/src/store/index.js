import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api, { viewTop5List } from '../api'
import AuthContext from '../auth'

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});


// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    OPEN_A_LIST: "OPEN_A_LIST",
    CLOSE_A_LIST: "CLOSE_A_LIST",
    LOAD_QUERIED_LIST: "LOAD_QUERIED_LIST",
    SET_ITEM_EDIT_ACTIVE: "SET_ITEM_EDIT_ACTIVE",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    CHANGE_VIEW: "CHANGE_VIEW",
    SET_PUBLISH_ERROR: "SET_PUBLISH_ERROR",
    CHANGE_SORT_ORDER: "CHANGE_SORT_ORDER",
}


// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        itemActive: false,
        listMarkedForDeletion: null,
        openedLists: new Set(),
        viewMode: "my",
        query: "",
        sortOrder: "newest",
        publishError: null,
    });
    const history = useHistory();



    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.top5List,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    viewMode: store.viewMode,
                    openedLists: new Set(),
                    publishError: null,
                    query: "",
                    sortOrder: store.sortOrder,
                    listMarkedForDeletion: null
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    publishError: null,
                    openedLists: new Set(),
                    sortOrder: store.sortOrder,
                    viewMode: store.viewMode,
                    query: "",
                    listMarkedForDeletion: null
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    publishError: null,
                    sortOrder: store.sortOrder,
                    openedLists: new Set(),
                    viewMode: store.viewMode,
                    query: "",
                    listMarkedForDeletion: null
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    openedLists: new Set(),
                    publishError: null,
                    query: "",
                    sortOrder: store.sortOrder,
                    isItemEditActive: false,
                    viewMode: store.viewMode,
                    listMarkedForDeletion: null
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    openedLists: store.openedLists,
                    publishError: null,
                    query: "",
                    isItemEditActive: false,
                    sortOrder: store.sortOrder,
                    viewMode: store.viewMode,
                    listMarkedForDeletion: payload
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    query: "",
                    sortOrder: store.sortOrder,
                    publishError: null,
                    viewMode: store.viewMode,
                    openedLists: store.openedLists,
                    listMarkedForDeletion: null
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    publishError: null,
                    sortOrder: store.sortOrder,
                    viewMode: store.viewMode,
                    query: "",
                    openedLists: new Set(),
                    listMarkedForDeletion: null
                });
            }
            // START EDITING A LIST ITEM
            case GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    publishError: null,
                    isItemEditActive: true,
                    query: "",
                    sortOrder: store.sortOrder,
                    viewMode: store.viewMode,
                    openedLists: new Set(),
                    listMarkedForDeletion: null
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: true,
                    isItemEditActive: false,
                    publishError: null,
                    query: "",
                    sortOrder: store.sortOrder,
                    viewMode: store.viewMode,
                    openedLists: new Set(),
                    listMarkedForDeletion: null
                });
            }
            // CHANGE VIEW MODE
            case GlobalStoreActionType.CHANGE_VIEW: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    publishError: null,
                    openedLists: new Set(),
                    query: "",
                    sortOrder: store.sortOrder,
                    listMarkedForDeletion: null,
                    viewMode: payload
                });
            }
            case GlobalStoreActionType.OPEN_A_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    publishError: null,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    query: store.query,
                    openedLists: store.openedLists.add(payload),
                    sortOrder: store.sortOrder,
                    listMarkedForDeletion: null,
                    viewMode: store.viewMode
                });
            }
            case GlobalStoreActionType.CLOSE_A_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    publishError: null,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    openedLists: store.openedLists.delete(payload),
                    listMarkedForDeletion: null,
                    query: store.query,
                    sortOrder: store.sortOrder,
                    viewMode: store.viewMode
                });
            }
            case GlobalStoreActionType.LOAD_QUERIED_LIST: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    publishError: null,
                    openedLists: store.openedLists,
                    query: payload.query,
                    listMarkedForDeletion: null,
                    sortOrder: store.sortOrder,
                    viewMode: store.viewMode
                });
            }
            case GlobalStoreActionType.SET_PUBLISH_ERROR: {
                return setStore({
                    publishError: payload,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    viewMode: store.viewMode,
                    openedLists: new Set(),
                    query: "",
                    sortOrder: store.sortOrder,
                    listMarkedForDeletion: null
                });
            }
            case GlobalStoreActionType.CHANGE_SORT_ORDER: {
                let sortedPayload = store.sort(store.idNamePairs, payload);
                return setStore({
                    idNamePairs: sortedPayload,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    publishError: null,
                    openedLists: new Set(),
                    query: store.query,
                    sortOrder: payload,
                    listMarkedForDeletion: null,
                    viewMode: store.viewMode
                });
            }
            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = async function (id, newName) {
        try{
            let response = await api.getTop5ListById(id);
            if (response.data.success) {
                let top5List = response.data.top5List;
                top5List.name = newName;
                async function updateList(top5List) {
                    response = await api.updateTop5ListById(top5List._id, top5List);
                    if (response.data.success) {
                        async function getListPairs(top5List) {
                            response = await api.getTop5ListPairsByUsername(auth.user.username);
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        top5List: top5List
                                    }
                                });
                            }
                        }
                        getListPairs(top5List);
                    }
                }
                updateList(top5List);
            }
           
        } catch (error) {
            console.log(error);
        }
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        
        history.push("/");
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;

        let payload = {
            name: newListName,
            items: ["?", "?", "?", "?", "?"],
            ownerUsername: auth.user.username
        };
        const response = await api.createTop5List(payload);
        if (response.data.success) {
            let newList = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            history.push("/top5list/" + newList._id);
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = async function () {
        try{
            const response = await api.getTop5ListPairsByUsername(auth.user.username);
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        catch(err){
            // let errorMsg = err.response.data.errorMessage;
            console.log(auth.user);
            let pairsArray = [];
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
        }
    }

    store.getListByString = async function (string) {
        let flag = "0";
        if (store.viewMode === "my") {
            flag = "1";
        }
        try{
            const response = await api.getListByString(string, flag, auth.user.username);
            if (response.data.success) {
                let top5List = response.data.data;
                console.log(top5List);
                let payload = {
                    idNamePairs: top5List,
                    query: string
                };

                storeReducer({
                    type: GlobalStoreActionType.LOAD_QUERIED_LIST,
                    payload: payload
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        catch(err){
            let payload = {
                idNamePairs: [],
                query: ""
            };
            storeReducer({
                type: GlobalStoreActionType.LOAD_QUERIED_LIST,
                payload: payload
            });
            console.log(err);
        }
    }

    store.getCommunityListByString = async function (string) {
        try{
            const response = await api.getCommunityListByString(string);
            if (response.data.success) {
                let top5List = response.data.data;
                console.log(top5List);
                let payload = {
                    idNamePairs: top5List,
                    query: string
                };
                storeReducer({
                    type: GlobalStoreActionType.LOAD_QUERIED_LIST,
                    payload: payload
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        catch(err){
            let payload = {
                idNamePairs: [],
                query: ""
            };
            storeReducer({
                type: GlobalStoreActionType.LOAD_QUERIED_LIST,
                payload: payload
            });
            console.log(err);
        }
    }

    store.loadPublishedLists = async function () {
        try{
            const response = await api.getPublishedTop5Lists();
            console.log(response);
            if (response.data.success) {
                let publishedLists = response.data.data;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: publishedLists
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        catch(err){
            let errorMsg = err.response.data.errorMessage;
            console.log(errorMsg);
        }   
    }

    store.loadListsByUsername = async function (username) {
        if (username === null) {
            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: []
            });
            return;
        }
        try{
            const response = await api.getPublishedTop5ListsByUsername(username);
            if (response.data.success) {
                let publishedLists = response.data.data;
                let payload = {
                    idNamePairs: publishedLists,
                    query: username
                };
                storeReducer({
                    type: GlobalStoreActionType.LOAD_QUERIED_LIST,
                    payload: payload
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        catch(err){
            let errorMsg = err.response.data.errorMessage;
            console.log(err);
        }
    }

    store.loadCommunityLists = async function () {
        try{
            const response = await api.getCommunityLists();
            console.log(response);
            if (response.data.success) {
                let communityList = response.data.data;
                
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: communityList
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        catch(err){
            let errorMsg = err.response.data.errorMessage;
            console.log(err);
        }
    }

    store.reloadIdNamePairs =  function () {
        console.log(store.query==="");
        if (store.query === undefined) return;
        if (store.query === "" ) {
            if (store.viewMode === "my") store.loadIdNamePairs();
            else if (store.viewMode === "all") store.loadPublishedLists();
            else if (store.viewMode === "community") store.loadCommunityLists();
        }
        else{
            if (store.viewMode === "user") store.loadListsByUsername(store.query);
            else  store.getListByString(store.query);
        }
        
    }
    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = async function (id) {
        // GET THE LIST
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                payload: top5List
            });
        }
    }

    store.deleteList = async function (listToDelete) {
        let response = await api.deleteTop5ListById(listToDelete._id);
        if (response.data.success) {
            store.loadIdNamePairs();
        }
    }

    store.likeList = async function (id) {
        try{
            let response;

            if (store.viewMode === "community") {
                response = await api.likeCommunityList(auth.user.username, id);
            }
            else{
                response = await api.likeTop5List(auth.user.username, id);
            }
            if (response.data.success) {
                store.reloadIdNamePairs();
            }
            else {
                console.log("API FAILED TO LIKE THE LIST");
            }
        }
        catch(err){
            console.log(err);
        }
    }

    store.dislikeList = async function (id) {
        try{
            let response;
            if (store.viewMode === "community") {
                response = await api.dislikeCommunityList(auth.user.username, id);
            }
            else {
                response = await api.dislikeTop5List(auth.user.username, id);
            }

            if (response.data.success) {
                store.reloadIdNamePairs();
            }
            else {
                console.log("API FAILED TO DISLIKE THE LIST");
            }
        }
        catch(err){
            console.log(err);
        }
    }

    store.viewList = async function (id) {
        try{
            let response;
            if (store.viewMode === "community") {
                response = await api.viewCommunityList(id);
            }
            else {
                response = await api.viewTop5List(id);
            }
            if (response.data.success) {
                store.reloadIdNamePairs();
            }
            else {
                console.log("API FAILED TO VIEW THE LIST");
            }
        }
        catch(err){
            console.log(err);
        }
    }

    store.deleteMarkedList = function () {
        store.deleteList(store.listMarkedForDeletion);
    }

    store.unmarkListForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
    }

    store.setCurrentList = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;

            response = await api.updateTop5ListById(top5List._id, top5List);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: top5List
                });
                history.push("/top5list/" + top5List._id);
            }
        }
    }

    store.changeViewMode = function (viewMode) {
        storeReducer({
            type: GlobalStoreActionType.CHANGE_VIEW,
            payload: viewMode
        });
    }

    
    store.updateItem = function (index, newItem) {
        store.currentList.items[index] = newItem;
        store.updateCurrentList();
    }

    store.updateCurrentList = async function () {
        const response = await api.updateTop5ListById(store.currentList._id, store.currentList);
        if (response.data.success) {
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST,
                payload: store.currentList
            });
        }
    }

    store.commentOnList = async function (comment, id) {
        try{
            const payload = { comment: comment};
            let response;
            if (store.viewMode === "community") {
                response = await api.commentCommunityList(auth.user.username, id, payload);
            }
            else {
                response = await api.commentTop5List(auth.user.username, id, payload);
            }
            if (response.data.success) {
                store.reloadIdNamePairs();

            }
            else {
                console.log("API FAILED TO COMMENT ON THE LIST");
            }
        }
        catch(err){
            console.log(err);
        }
    }



    store.openAList = function (id) {
        storeReducer({
            type: GlobalStoreActionType.OPEN_A_LIST,
            payload: id
        });
    }

    store.closeAList = function (id) {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_A_LIST,
            payload: id
        });
    }


    store.checkPublish = async function () {
        for(let i = 0; i < store.currentList.items.length; i++){
            if(store.currentList.items[i] === "?"){
                // store.setPublishError("Please fill all the items");
                storeReducer({
                    type: GlobalStoreActionType.SET_PUBLISH_ERROR,
                    payload: "Please fill all the items"
                });
                return;
            }
        }

        let itemSet = new Set();

        for (let i = 0; i < store.currentList.items.length; i++) {
            if (itemSet.has(store.currentList.items[i].toLowerCase())) {
                storeReducer({
                    type: GlobalStoreActionType.SET_PUBLISH_ERROR,
                    payload: "You cannot have duplicate items (case-insensitive)"
                });
                return;
            }
            itemSet.add(store.currentList.items[i].toLowerCase());
        }

        if(store.currentList.name === ""){
            store.setPublishError("Your list needs a name");
            return;
        }
        
        const response = await api.getPublishedTop5ListByUsername(auth.user.username, store.currentList.name);
        console.log(response);
        if (response.data.success) {
            if (response.data.data.length > 0) {
                store.setPublishError("You already have a list with this name");
            }
            else {
                console.log(store.currentList);
                store.setPublishError(null);
            }
        }

    }

    store.setPublishError = function (errorMsg) {
        storeReducer({
            type: GlobalStoreActionType.SET_PUBLISH_ERROR,
            payload: errorMsg
        });
    }

    store.publishList = async function () {
        const response = await api.publishTop5List(store.currentList._id);
        if (response.data.success) {
            store.loadIdNamePairs();
            return
        }
        else {
            console.log("API FAILED TO PUBLISH A LIST");
        }
    }

    store.sort = function (top5lists, sortOrder) {
        switch(sortOrder){
            case "newest": 
                console.log("SORTING BY NEWEST");
                top5lists.sort(function(a, b){
                    return new Date(b.publishedDate) - new Date(a.publishedDate);
                });
                return top5lists;
            case "oldest":
                top5lists.sort(function(a, b){
                    return new Date(a.publishedDate) - new Date(b.publishedDate);
                });
                return top5lists;
            
            case "likes":
                console.log("SORTING BY LIKES");
                top5lists.sort(function(a, b){
                    return b.likedBy.length - a.likedBy.length;
                });
                return top5lists;
            case "dislikes":
                top5lists.sort(function(a, b){
                    return b.dislikedBy.length - a.dislikedBy.length;
                });
                return top5lists;
            case "views":
                top5lists.sort(function(a, b){
                    return b.views - a.views;
                });
                return top5lists;
            default: 
                return top5lists;
        }
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING AN ITEM
    store.setIsItemEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE,
            payload: null
        });
    }

    store.setSortOrder = function (sortOrder) {
        storeReducer({
            type: GlobalStoreActionType.CHANGE_SORT_ORDER,
            payload: sortOrder
        });

    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };