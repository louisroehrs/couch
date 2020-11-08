import logo from './logo.svg';
import './Button.css';

const  Button =({
  label,
  callForOn,
  outletOn
}) => {
  
  return (
    <div class="button">
      <div class="label">{label}</div>
      <div class={callForOn ? 'switchOn': 'switchOff'} >{callForOn}</div>
      <div class={outletOn ? 'poweredOn': 'poweredOff'} >{outletOn?"On": "Off"}</div>
    </div>
  );
}

export default Button;
