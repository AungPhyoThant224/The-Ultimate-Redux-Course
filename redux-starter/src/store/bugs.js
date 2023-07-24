import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment";
import axios from "axios";

const slice = createSlice({
    name: 'bugs',
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        bugRequested: (bugs, action) => {
            bugs.loading = true;
        },

        bugRecieved: (bugs, action) => {
            bugs.list = action.payload;
            bugs.loading = false;
            bugs.lastFetch = Date.now();
        },

        bugRequestFailed: (bugs) => {
            bugs.loading = false;
        },

        bugAdded: (bugs, action) => {
            bugs.list.push(action.payload)
        },

        bugAssignedToUser: (bugs, action) => {
            const { id: bugId, userId } = action.payload;
            const index = bugs.list.findIndex(bug => bug.id === bugId);
            bugs.list[index].userId = userId;
        },

        bugResolved: (bugs, action) => {
            const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
            bugs.list[index].resolved = true;
        }
    }
})

export const { bugAdded, bugResolved, bugAssignedToUser, bugRecieved, bugRequested, bugRequestFailed } = slice.actions;
export default slice.reducer;

// Action Creator
const url = '/bugs'

export const loadBugs = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.bugs;

    const diffInMinute = moment().diff(moment(lastFetch), 'minutes')

    if (diffInMinute < 10) return;

    dispatch(apiCallBegan({
        url,
        onStart: bugRequested.type,
        onSuccess: bugRecieved.type,
        onError: bugRequestFailed.type,
    }))
}

// export const addBug = bug => async dispatch => {
//     const response = await axios.request({
//         baseURL: 'http://localhost:9001/api',
//         url: '/bugs',
//         method: 'post',
//         data: bug
//     });
//     dispatch(bugAdded(response.data));
// }

export const addBug = bug => apiCallBegan({
    url,
    method: 'post',
    data: bug,
    onSuccess: bugAdded.type
})

export const resolveBug = bugId => apiCallBegan({
    url: url + '/' + bugId,
    method: 'patch',
    data: { resolved: true },
    onSuccess: bugResolved.type
})

export const assignBugToUser = ({ userId, bugId }) => apiCallBegan({
    url: url + '/' + bugId,
    method: 'patch',
    data: { userId },
    onSuccess: bugAssignedToUser.type
})

//Selectors
//Memoizition

export const getUnresolvedBugs = createSelector(
    state => state.entities.bugs,
    state => state.entities.project,
    (bugs, projects) => bugs.list.filter(bug => !bug.resolved),
)

export const getBugByUser = userId => createSelector(
    state => state.entities.bugs,
    (bugs) => bugs.filter(bug => bug.userId === userId)
)