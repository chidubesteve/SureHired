import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { jobsApi } from "./services/Jobs";
import { companyApi } from "./services/company";

const store = configureStore({
  reducer: {
    [jobsApi.reducerPath]: jobsApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(jobsApi.middleware)
      .concat(companyApi.middleware),
});

setupListeners(store.dispatch);
// infer  the root state and dispatch types from the store
// this is useful for typing the useSelector and useDispatch hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
