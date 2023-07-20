// import { bugAdded, bugRemoved, bugResolved } from "./store/bugs";
// import configureStore from "./store/configureStore";

// const store = configureStore();

// const unsubscribe = store.subscribe(() => console.log('Store Change!', store.getState()));

// store.dispatch(bugAdded({ descripton: "Bug 1" }));
// store.dispatch(bugAdded({ descripton: "Bug 2" }));
// store.dispatch(bugResolved({ id: 1 }));
// // store.dispatch(bugRemoved(1));

// unsubscribe();
// console.log(store.getState());

import { projectAdded } from "./store/project";
import configureStore from "./store/configureStore";

const store = configureStore();

store.dispatch(projectAdded({ name: "Project 1" }));
store.dispatch(projectAdded({ name: "Project 2" }));