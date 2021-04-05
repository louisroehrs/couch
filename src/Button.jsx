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
    <div class="button"  onClick={onClick}>
      <div class="label">{label}</div>
      <div class={callForOn ? 'switchOn': 'switchOff'}>{callForOn}</div>
      <div class={outletOn ? 'poweredOn': 'poweredOff'} >{outletOn?"On": "Off"}</div>
    </div>
  );
}

export default Button;
