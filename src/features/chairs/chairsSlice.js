import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  outlets: [
    { id: 0, label: 'Couch', callForOn: false, requested: false, outletOn: false, exclusive: true},
    { id: 1, label: 'Chair1', callForOn: true, requested: true, outletOn: true, exclusive: true},
    { id: 2, label: 'Couch', callForOn: false, requested: false, outletOn: false, exclusive: true},
    { id: 3, label: 'Couch', callForOn: false, requested: false, outletOn: false, exclusive: false},
    { id: 4, label: 'Couch', callForOn: false, requested: false, outletOn: false, exclusive: false},
    { id: 5, label: 'Couch', callForOn: false, requested: false, outletOn: false, exclusive: false},
    { id: 6, label: 'Couch', callForOn: false, requested: false, outletOn: false, exclusive: false},
    { id: 7, label: 'Couch', callForOn: false, requested: false, outletOn: false, exclusive: false}
  ],
  device: { poweredOn: false,
          }
}

const chairsSlice  = createSlice ({
  name: 'chairs',
  initialState,
  reducers: {}
})

export default chairsSlice.reducer
/*
export default function chairsReducer(state = initialState, action) {
  switch (action.type) {
  case 'chairs/statusChanged' : {
    return {
      ...state
    }
  }
  }
}
*/
      
