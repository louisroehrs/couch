import { outletsLoading, outletsFetched, outletsFetchedError } from './outletsSlice'

function fetchOutlets(dispatch) {
  return dispatch => {
    dispatch(outletsLoading());
    let headers= new Headers();
    headers.append('Authorization', 'Basic ' + btoa("admin:1234"));
    fetch('http://10.0.0.200/restapi/relay/outlets/all;/state/', {headers:headers})
      .then(res => res.json())
      .then(res => {
        if(res.error) {
          throw(res.error);
        }
        dispatch(outletsFetched(res));

        return res;
      })
      .catch(error => {
        dispatch(outletsFetchedError(error));
      })
  }
}

    
export default fetchOutlets;
