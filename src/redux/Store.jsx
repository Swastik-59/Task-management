import { configureStore } from '@reduxjs/toolkit'
import  taskSlice  from './counter/TaskSlice'

const store = configureStore({
  reducer: {
    tasks:taskSlice
  },
})

export default store;