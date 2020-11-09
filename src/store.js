import { configureStore } from  '@reduxjs/toolkit'

import outletsReducer  from './features/outlets/outletsSlice'


export default configureStore ( {
  reducer: {
    outlets: outletsReducer
  }
})


