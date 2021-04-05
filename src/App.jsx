import { BrowserRouter, useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import logo from './logo.svg';
import './App.css';
import Button from './Button.jsx';
import useOutletService  from './features/outlets/outletService.js';

const  App = () =>  {

  const outlets = useSelector( (state) => state.outlets.outlets);
  const outletsLoading = useSelector( (state) => state.outletsLoading);
  const error = useSelector( (state) => state.outlets.error);

  const dispatch = useDispatch();

  const outletService = useOutletService(dispatch);

  useEffect(()=>{
    outletService.fetchOutlets();
    outletService.getRequestedChairs();
    const interval=setInterval(()=>{
      outletService.fetchOutlets()
      outletService.getRequestedChairs()
     },2000)
     return()=>clearInterval(interval)
  },[]);

  const handleOnClick = (outlet) => {
    if (outlet.exclusive) {
      outletService.toggleCallForOn(outlet);
    } else {
      outletService.setOutlet(outlet.id,!outlet.outletOn);
    }
    outletService.fetchOutlets();
  }
  
  return (
	  <div className="App">
          <header className="App-header">
            {outlets.error ? <div>{outlets.error}</div> :""}
            {outlets.outletsLoading ? <div>loading</div>:""}
	          { outlets.map ( outlet => (
              <Button
                key = {outlet.id} 
                id={outlet.id}
                label={outlet.name}
                callForOn = {outlet.callForOn}
                outletOn = {outlet.outletOn}
                onClick = {() => handleOnClick(outlet)}
              />
        ))}
	    </header>
	  </div>
    );
}

export default App;
