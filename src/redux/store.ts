import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './slices/filterSlice'
import cartSlice from './slices/cartSlice'
import sushiSlice from './slices/sushiSlice'
import { useDispatch } from 'react-redux'

const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    sushiSlice
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store