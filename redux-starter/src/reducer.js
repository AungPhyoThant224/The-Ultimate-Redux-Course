import { BUG_ADDED, BUG_REMOVE } from "./actionTypes";

let lastId = 0;

export default function reducer(state = [], action) {
    switch (action.type) {
        case BUG_ADDED:
            return [
                ...state,
                {
                    id: ++lastId,
                    description: action.payload.description,
                    resolved: false,
                }
            ]
        case BUG_REMOVE:
            return state.filter(bug => bug.id !== action.payload.id);
        default:
            return state;
    }
}