import { typeCartItem } from './cartSlice';
import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export type TypeSushiState  = {
  items: typeCartItem[]
  status: Status
}

const initialState: TypeSushiState = {
	items: [],
  status: Status.LOADING
}

export const fetchSushi = createAsyncThunk(
  'sushi/fetchSushiStatus',
  async ({
    categoryParam,
    sortParam,
    orderParam,
    inputParam,
    selectedPage
  }: Record<string, string>) => {
    const { data } = await axios.get(
      `https://65807ad76ae0629a3f554ec4.mockapi.io/items?${categoryParam}${sortParam}${orderParam}${inputParam}&page=${selectedPage}&limit=8`,
    )
    return data
  }
)

const sushiSlice = createSlice({
	name: 'sushi',
	initialState,
	reducers: {
    setItems(state, action) {
      state.items = action.payload
    }
	},
  extraReducers: (builder) => {
    builder.addCase(fetchSushi.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    });
    builder.addCase(fetchSushi.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SUCCESS
    });
    builder.addCase(fetchSushi.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    });
  }
})

export const { setItems } = sushiSlice.actions

export default sushiSlice.reducer
