import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

let lastId = 0;

const slice = createSlice({
    name: 'bugs',
    initialState: [],
    reducers: {
        bugAdded: (bugs, action) => {
            bugs.push({
                id: ++lastId,
                description: action.payload.description,
                resolved: false,
            })
        },

        bugAssignedToUser: (bugs, action) => {
            const { bugId, userId } = action.payload;
            const index = bugs.findIndex(bug => bug.id === bugId);
            bugs[index].userId = userId;
        },

        bugResolved: (bugs, action) => {
            const index = bugs.findIndex(bug => bug.id === action.payload.id);
            bugs[index].resolved = true;
        }
    }
})

export const { bugAdded, bugResolved, bugAssignedToUser } = slice.actions;
export default slice.reducer;

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