import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  outlets: [
    { id: 0, label: 'Couch', callForOn: false, requested: false, outletOn: false, exclusive: true},
    { id: 1, label: 'Chair1', callForOn: true, requested: true, outletOn: true, exclusive: true},
    { id: 2, label: 'Chair2', callForOn: false, requested: false, outletOn: false, exclusive: true},
    { id: 3, label: 'Tree', callForOn: false, requested: false, outletOn: false, exclusive: false},
    { id: 4, label: 'Water', callForOn: true, requested: true, outletOn: true, exclusive: false},
    { id: 5, label: 'Scooter', callForOn: false, requested: false, outletOn: false, exclusive: false},
    { id: 6, label: 'Mooey', callForOn: false, requested: false, outletOn: false, exclusive: false},
    { id: 7, label: 'Socky', callForOn: false, requested: false, outletOn: false, exclusive: false}
  ],
  device: { poweredOn: false,
          }
}

const outletsSlice  = createSlice ({
  name: 'outlets',
  initialState,
  reducers: {
    outletsLoading: (state,action) => {
      state.outletsLoading = true;
    },
    outletsFetched: (state,action) => {
      state.outlets.map( outlet => {outlet.outletOn = action.payload[outlet.id]; return outlet})
      state.outletsLoading = false;
    },
    outletsFetchedError: (state,action) => {
      state.outletsLoading = false;
      state.error = action.payload;
    }

  }
})


export const { outletsLoading, outletsFetched, outletsFetchedError} = outletsSlice.actions

export default outletsSlice.reducer
