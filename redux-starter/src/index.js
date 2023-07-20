import { bugAdded, bugResolved, getUnresolvedBugs } from "./store/bugs";
import configureStore from "./store/configureStore";
import { projectAdded } from "./store/project";

const store = configureStore();

const unsubscribe = store.subscribe(() => console.log('Store Change!', store.getState()));


store.dispatch(projectAdded({ name: "Project 1" }));
store.dispatch(projectAdded({ name: "Project 2" }));
store.dispatch(bugAdded({ descripton: "Bug 1" }));
store.dispatch(bugAdded({ descripton: "Bug 2" }));
store.dispatch(bugResolved({ id: 1 }));
// store.dispatch(bugRemoved(1));

const unresolvedBugs = getUnresolvedBugs(store.getState());
console.log("Unresolved", unresolvedBugs);

unsubscribe();
console.log(store.getState());