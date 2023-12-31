import { loadBugs, assignBugToUser } from "./store/bugs";
import configureStore from "./store/configureStore";

const store = configureStore();

// const unsubscribe = store.subscribe(() => console.log('Store Change!', store.getState()));

// store.dispatch(userAdded({ name: "ABC" }));
// store.dispatch(projectAdded({ name: "Project 1" }));
// store.dispatch(projectAdded({ name: "Project 2" }));
// store.dispatch(bugAdded({ description: "Bug 1" }));
// store.dispatch(bugAdded({ description: "Bug 2" }));
// store.dispatch(bugResolved({ id: 1 }));
// store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }));

// const unresolvedBugs = getUnresolvedBugs(store.getState());
// const bugByUser = getBugByUser(1)(store.getState());

// unsubscribe();
// console.log(bugByUser);

// store.dispatch((dispatch, getState) => {
//     dispatch({ type: 'bugReceived', bugs: [1, 2, 3] });
//     dispatch({ type: 'error', payload: { message: 'An error occured.' } })
//     console.log(getState());
// });

//UI layer
// store.dispatch(addBug({ description: "a" }));

store.dispatch(loadBugs());

setTimeout(() => store.dispatch(assignBugToUser({ userId: 1, bugId: 1 })), 2000);

