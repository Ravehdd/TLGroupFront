import { configureStore, createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { employeeSlice } from "./employee.slice";
import { additionalDataSlice } from "./additionalData.slice";


export const store = configureStore({
    reducer: {
        [employeeSlice.name]: employeeSlice.reducer
        , [additionalDataSlice.name]: additionalDataSlice.reducer

    }
  });

export type AppDispatch = typeof store.dispatch;

export type AppState = ReturnType<typeof store.getState>;
export const createAppSelector = createSelector.withTypes<AppState>();
export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppdispatch = useDispatch.withTypes<AppDispatch>();