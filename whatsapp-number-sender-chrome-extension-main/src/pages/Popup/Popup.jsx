import React, { useState } from 'react';
import { Input, Button } from 'antd';
import './Popup.css';

const Popup = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneNumberError, setPhoneNumberError] = useState(false);
  return (
    <div className={`App ${isPhoneNumberError && 'input-error'}`}>
      <Input
        value={phoneNumber}
        onChange={({ target }) => {
          setPhoneNumberError(false);
          setPhoneNumber(target.value);
        }}
      />
      <Button
        style={{ margin: '10px 0' }}
        onClick={() => {
          if (!phoneNumber) {
            setPhoneNumberError(true);
            return;
          }
          chrome.tabs.create({ url: `https://wa.me/${phoneNumber}` });
        }}
        type="primary"
      >
        Send Whatsapp Message
      </Button>
    </div>
  );
};

export default Popup;
