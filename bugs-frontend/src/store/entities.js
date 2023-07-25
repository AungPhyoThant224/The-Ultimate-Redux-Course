import { combineReducers } from "redux";
import bugsReducer from './bugs';
import projectsReducer from './project'
import userReducer from './user'

export default combineReducers({
    bugs: bugsReducer,
    projects: projectsReducer,
    user: userReducer,
})