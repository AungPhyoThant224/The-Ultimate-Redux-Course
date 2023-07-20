import { createAction, createReducer } from "@reduxjs/toolkit";

export const bugAdded = createAction("bugAdded");
export const bugRemoved = createAction("bugRemoved");
export const bugResolved = createAction("bugResolved");

//Reducers
let lastId = 0;

export default createReducer([], {
    [bugAdded.type]: (state, action) => {
        state.push({
            id: ++lastId,
            description: action.payload.description,
            resolved: false,
        })
    },
    [bugResolved.type]: (bugs, action) => {
        const index = bugs.findIndex(bug => bug.id === action.payload.id);
        bugs[index].resolved = true;
    }
})