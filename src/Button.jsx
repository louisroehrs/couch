import logo from './logo.svg';
import './Button.css';

const  Button =({
  id, 
  label,
  callForOn,
  outletOn,
  onClick
}) => {
  return (
    <div class="button">
      <div class="label">{label}</div>
      <div class={callForOn ? 'switchOn': 'switchOff'} onClick={onClick}>{callForOn}</div>
      <div class={outletOn ? 'poweredOn': 'poweredOff'} >{outletOn?"On": "Off"}</div>
    </div>
  );
}

export default Button;
