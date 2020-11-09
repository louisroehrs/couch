import {  useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import logo from './logo.svg';
import './App.css';
import Button from './Button.jsx';
import fetchOutlets from './features/outlets/outletService.js';

const  App = () =>  {

  const outlets = useSelector( (state) => state.outlets.outlets);

  const dispatch = useDispatch();


  useEffect(()=>{
    dispatch(fetchOutlets())    
    const interval=setInterval(()=>{
      dispatch(fetchOutlets())    
     },5000)
     return()=>clearInterval(interval)
  },[]);



  return ( 
	  <div className="App">
	    <header className="App-header">
	       { outlets.map ( outlet => (
           <Button
             key = {outlet.id} 
             id={outlet.id}
             label={outlet.label}
             callForOn = {outlet.callForOn}
             outletOn = {outlet.outletOn}
          />
        ))}
	    </header>
	  </div>
    );
}

export default App;
