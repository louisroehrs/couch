import {useSelector} from 'react-redux'
import logo from './logo.svg';
import './App.css';
import Button from './Button.jsx';


const  App = () =>  {

  const outlets = useSelector( (state) => state.chairs.outlets);
  return ( 
	  <div className="App">
	    <header className="App-header">
	       { outlets.map ( outlet => (
          <Button
            id={outlet.id}
            label={outlet.label}
            callForOn = {outlet.callForOn}
            outletOn = {outlet.outletOn}
          />
        ))}
        
        {/*
       
        <Button
          label={"Chair"}
          on={"yes"}
          powered={"yes"}
        />
        <Button
          label={"Chair"}
          on={"yes"}
          powered={"yes"}
        />
        <Button
          label={"Couch"}
          on={"yes"}
          powered={"yes"}
        />
         */}
        
	    </header>
	  </div>
    );
}

export default App;
