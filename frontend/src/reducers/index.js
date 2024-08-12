// reducers/index.js
import { combineReducers } from "@reduxjs/toolkit";
import resumeBuilderReducer from "./resumeBuilderSlice";
import jobReducer from "./jobSlice";

const rootReducer = combineReducers({
  resumeBuilder: resumeBuilderReducer,
  jobs: jobReducer,
  // Add other reducers here
});

export default rootReducer;
