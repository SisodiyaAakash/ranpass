import React, { useState, useRef } from 'react';
import ValutVector from '../assets/media/vault-vector.svg';
import GenerateIcon from '../assets/media/generate-icon.svg';
import ReGenerateIcon from '../assets/media/regenerate-icon.svg';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('a27)kash$gen');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [isGenerated, setIsFirstGeneration] = useState(false);
  const [copyNotification, setCopyNotification] = useState('');
  const resultInputRef = useRef(null);

  const generatePassword = () => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    if (isGenerated === false) {
      setIsFirstGeneration(true);
    }

    let allChars = '';
    let finalPassword = '';


    if (includeUppercase) allChars += uppercaseChars;
    if (includeLowercase) allChars += lowercaseChars;
    if (includeNumbers) allChars += numberChars;
    if (includeSymbols) allChars += symbolChars;

    if (!allChars) {
      alert('Please select at least one character type.');
      return;
    }

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      finalPassword += allChars.charAt(randomIndex);
    }

    setPassword(finalPassword);
  };

  const handleLengthChange = (e) => {
    setLength(parseInt(e.target.value));

    if (isGenerated === true) {
      setIsFirstGeneration(false);
    }
  };

  const handleCheckboxChange = (checkboxType) => {
    // Update the corresponding state 
    switch (checkboxType) {
      case 'uppercase':
        setIncludeUppercase(!includeUppercase);
        break;
      case 'lowercase':
        setIncludeLowercase(!includeLowercase);
        break;
      case 'numbers':
        setIncludeNumbers(!includeNumbers);
        break;
      case 'symbols':
        setIncludeSymbols(!includeSymbols);
        break;
      default: break;
    }
    // Reset isGenerated to false
    if (isGenerated === true) {
      setIsFirstGeneration(false);
    }
  };

  const handleResultInputFocus = () => {
    // Check if the input field is not null and execute the copy command
    if (resultInputRef.current) {
      resultInputRef.current.select();
      document.execCommand('copy');

      setCopyNotification('Copied to clipboard!');
      setTimeout(() => {
        setCopyNotification('');
      }, 2500); // Clear the notification after 2.5 seconds
    }
  };

  return (
    <div className="main-wrapper">
      <div className='container'>
        <div className='ranpass-inner-wrapper'>
          <div className='content-area'>
            <h3>Generate secure passwords</h3>
            <p>Use random secure password to enhance your security in this digital world</p>
            <img className='content-media' src={ValutVector} alt='Vault Vector' />
          </div>

          <div className='action-area'>
            <div className="result-section">
              <input
                className='result-field'
                type="text"
                readOnly
                value={password}
                ref={resultInputRef}
                onFocus={handleResultInputFocus}
              />
              <button
                onClick={generatePassword}
                className={`${isGenerated ? '' : 'active'}`}
              >
                <img src={isGenerated ? ReGenerateIcon : GenerateIcon} alt="Generate" />
              </button>
            </div>

            {copyNotification && <p className="copy-notification">{copyNotification}</p>}

            <div className="form-section">
              <div className='length-range'>
                <input
                  type="range"
                  className='range-field'
                  value={length}
                  min="1"
                  max="50"
                  onChange={handleLengthChange}
                />
                <span>{length}</span>
              </div>
              <div className="parameters">
                <label
                  className='field-group'
                >
                  <input
                    type="checkbox"
                    checked={includeUppercase}
                    onChange={() => handleCheckboxChange('uppercase')}
                  />
                  <p>Uppercase</p>
                </label>
                <label
                  className='field-group'
                >
                  <input
                    type="checkbox"
                    checked={includeLowercase}
                    onChange={() => handleCheckboxChange('lowercase')}
                  />
                  <p>Lowercase</p>
                </label>
                <label
                  className='field-group'
                >
                  <input
                    type="checkbox"
                    checked={includeNumbers}
                    onChange={() => handleCheckboxChange('numbers')}
                  />
                  <p>Numbers</p>
                </label>
                <label
                  className='field-group'
                >
                  <input
                    type="checkbox"
                    checked={includeSymbols}
                    onChange={() => handleCheckboxChange('symbols')}
                  />
                  <p>Symbols</p>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
