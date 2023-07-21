import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment";

let lastId = 0;

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
            bugs.list.push({
                id: ++lastId,
                description: action.payload.description,
                resolved: false,
            })
        },

        bugAssignedToUser: (bugs, action) => {
            const { bugId, userId } = action.payload;
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

//Selectors
//Memoizition

export const getUnresolvedBugs = createSelector(
    state => state.entities.bugs,
    state => state.entities.project,
    (bugs, projects) => bugs.filter(bug => !bug.resolved),
)

export const getBugByUser = userId => createSelector(
    state => state.entities.bugs,
    (bugs) => bugs.filter(bug => bug.userId === userId)
)