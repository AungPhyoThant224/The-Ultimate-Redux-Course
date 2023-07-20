import { combineReducers } from "redux";
import bugsReducer from './bugs';
import projectsReducer from './project'

export default combineReducers({
    bugs: bugsReducer,
    projects: projectsReducer
})