// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import jobReducer from "./jobSlice";
import companyReducer from "./companySlice";
import applicantReducer from "./applicationsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer,
    company: companyReducer,
    applicant: applicantReducer, // ✅ add here
  },
});

export default store;
