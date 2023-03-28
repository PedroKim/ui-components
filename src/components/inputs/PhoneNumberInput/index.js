import { useState } from "react";
import './PhoneNumberInput.css';

const DIGITS = "0123456789".split('');

const PhoneNumberInput = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    setError('');
    let val = e.target.value;
    let lastChar = val[val.length - 1];

    if (val.length > 12) {
      setError('Phone number cannot be longer than 10 digits');
      return;
    }

    if (e.nativeEvent.inputType !== 'deleteContentBackward' && !DIGITS.includes(lastChar)) {
      setError(`${lastChar} is not a valid input`);
      return;
    }

    if (e.nativeEvent.inputType !== 'deleteContentBackward' && (val.length === 3 || val.length === 7)) {
      val += "-";
    } else if ((val.length === 4 || val.length === 8) && lastChar !== '-') {
      val = val.slice(0, val.length - 1) + "-" + lastChar;
    }

    setPhoneNumber(val);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (phoneNumber.length !== 12) {
      setError('Phone number must be 10 digits');
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <input type="text" 
          name="phonenumber" 
          placeholder="Enter Phone Number"
          value={phoneNumber} 
          onChange={handleChange} />
        <p>{error}</p>
      </div>
      <br/>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default PhoneNumberInput;