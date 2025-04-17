import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { BACKEND_API } from "../../axios"
import { TResponse, TUser } from "../../types"

export const isAuth = createAsyncThunk("isAuth", async () => {
	return (await BACKEND_API.get("/api/auth/isAuth").then(
		res => {
			return res.data
		},
		res => {
			return res.response?.data
		}
	)) as TResponse<TUser>
})

type UserState = {
	user: TUser
	isLoading: boolean
	isAuth: boolean
	isInitialCheckComplete: boolean
	error: string
}

const initialState: UserState = {
	user: {} as TUser,
	isLoading: false,
	isAuth: false,
	isInitialCheckComplete: false,
	error: "",
}

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		loginUser: (state, payload: PayloadAction<TUser>) => {
			state.isAuth = true
			state.user = payload.payload
		},
		logout: state => {
			window.localStorage.removeItem("access_token")
			state.user = {} as TUser
			state.isLoading = false
			state.isAuth = false
			state.isInitialCheckComplete = false
			state.error = ""
		},
	},
	extraReducers: builder => {
		builder.addCase(isAuth.pending, state => {
			state.isLoading = true
		})
		builder.addCase(isAuth.fulfilled, (state, res) => {
			const type = res.payload.statusCode === 200 ? true : false

			if (type) {
				state.user = res.payload.message
			} else {
				window.localStorage.removeItem("access_token")
				state.error = res.payload.error
				state.user = {} as TUser
				state.isLoading = false
				state.isAuth = false
				state.isInitialCheckComplete = false
				state.error = ""
			}
			state.isInitialCheckComplete = true
			state.isAuth = type
			state.isLoading = false
		})
	},
})

export const userReducer = userSlice.reducer
export const { loginUser, logout } = userSlice.actions
