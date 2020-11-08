import { configureStore } from  '@reduxjs/toolkit'

import chairsReducer  from './features/chairs/chairsSlice'


export default configureStore ( {
  reducer: {
    chairs: chairsReducer
  }
})


