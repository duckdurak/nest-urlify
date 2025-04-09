import { configureStore } from "@reduxjs/toolkit"
import { urlsReducer } from "./slices/links.slice"
import { userReducer } from "./slices/user.slice"

export const store = configureStore({
	reducer: {
		user: userReducer,
		urls: urlsReducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
