import { BUG_ADDED, BUG_REMOVE } from "./actionTypes";
import store from "./store";

const unsubscribe = store.subscribe(() => console.log('Store Change!', store.getState()));

store.dispatch({
    type: BUG_ADDED,
    payload: {
        description: "Bug 1"
    }
});

unsubscribe();

store.dispatch({
    type: BUG_REMOVE,
    payload: {
        id: 1
    }
})

console.log(store.getState());