import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { BACKEND_API } from "../../axios"
import { TGetUrlsResponse, TResponse, TUrl } from "../../types"

export const getUrls = createAsyncThunk(
	"getUrls",
	async (payload: { page: number; perPage: number }) => {
		return (await BACKEND_API.get("/api/url", {
			params: { page: payload.page, perPage: payload.perPage },
		}).then(
			res => {
				return res.data
			},
			res => {
				return res.response?.data
			}
		)) as TResponse<TGetUrlsResponse>
	}
)

type UrlState = {
	urls: TUrl[]
	totalCount: number
	currentPage: number
	perPage: number
	isLoading: boolean
	error: string
}

const initialState: UrlState = {
	urls: [] as TUrl[],
	totalCount: 0,
	currentPage: 1,
	perPage: 5,
	isLoading: false,
	error: "",
}

const urlsSlice = createSlice({
	name: "urls",
	initialState,
	reducers: {
		setPage: (state, payload: PayloadAction<number>) => {
			state.currentPage = payload.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(getUrls.pending, state => {
			state.isLoading = true
		})
		builder.addCase(getUrls.fulfilled, (state, res) => {
			const type = res.payload.statusCode === 200 ? true : false

			if (type) {
				state.urls = res.payload.message.urls
				state.totalCount = res.payload.message.totalCount
			} else {
				state.error = res.payload.error
			}
			state.isLoading = false
		})
	},
})

export const urlsReducer = urlsSlice.reducer
export const { setPage } = urlsSlice.actions
