import { useEffect, useState } from "react";
import "./App.css";
import MyCheckbox from "./components/Checkbox";
import MySlider from "./components/MySlider";
import {FaRegCopy} from 'react-icons/fa'
import {CopyToClipboard} from 'react-copy-to-clipboard';



function App() {
  let [strength, setStrength] = useState(0)
  const [characterLength, setCharacterLength] = useState(20)
  const [includeUppercase, setIncludeUppercase] = useState(false)
  const [includeLowercase, setIncludeLowercase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const [strengthArray, setStrengthArray] = useState([false, false, false, false])
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)
  
  useEffect(() => {
    // array for the booleans
    const newStrengthArray = [includeLowercase, includeUppercase, includeNumbers, includeSymbols];
    // array that just stores the true values
    const newStrength = newStrengthArray.filter(value => value === true).length;
    
    setStrengthArray(newStrengthArray);
    setStrength(newStrength);
  }, [includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const setCharacters = (_event: Event, value: number | number[]) => {
    setCharacterLength(value as number)
  };

  const getColor = (strength : number) => {

    switch (strength){
      case strength = 0:
        console.log('inherit')
        return 'inherit'
      break;
      case strength = 1:
        console.log('red')
        return '#D94E41'
      break;
      case strength = 2:
        console.log('orange')
        return '#F2921D'
      break;
      case strength = 3:
        console.log('purple')
        return '#F2AE2E'
      break;
      case strength = 4:
        console.log('green')
        return '#a5ffaf'
      break;
    }
  }
  
  const generatePassword = () => {
    setCopied(false)
    if(strength > 0){
      let reference = ""
      let password = ""
      
      if(includeUppercase == true){
        reference += "ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ"
      }
      if(includeLowercase == true){
        reference += "abcdefghijklmnopqrstuvwxyzæøå"
      }
      if(includeNumbers == true){
        reference += "1234567890"
      }
      if(includeSymbols == true){
        reference += "@#$!"
      }
      
      for(let i = 0; i < characterLength; i++){
        password += reference[Math.floor(Math.random() * reference.length)]
      }
      setPassword(password)
    }
    else {
      setPassword('P4$W0rD')
    }
  }

  return (
    <div className="wrapper">
      <h1 className="title">Password generator</h1>
      <div className="card">
        {/* Generated Password */}
        <div className="password">
          <h3 style={{letterSpacing: "5px", fontSize: "2rem", color:"white", padding:"1rem"}}>{password ? password : "P4$w0RD"}</h3>
          <CopyToClipboard text={password} onCopy={() => ({copied: true})}  >
          <div className="copy-container" onClick={() => setCopied(true)}>
            <div style={{display:"flex", justifyContent:"center", alignItems:"center", gap:5}} >
              <FaRegCopy size={25} className='copy-icon'/>
              <span>{copied ? "Copied" : "Copy"}</span>
            </div>
          </div>
          </CopyToClipboard>
        </div>
        {/* Password settings */}

        <div className="card-main">
          {/* slider */}
          <div className="slider-container">
            <div className="slider-header">
              <h3>Character length</h3>
              <span>{characterLength}</span>
            </div>
            <MySlider min={0} max={25} defaultValue={20} onChange={(e, value) => setCharacters(e, value)} />
          </div>
          {/* Checkbox */}
          <div>
            <MyCheckbox isChecked={includeUppercase} setChecked={setIncludeUppercase  } label="include uppercase letters"  />
            <MyCheckbox isChecked={includeLowercase} setChecked={setIncludeLowercase} label="include lowercase letters" />
            <MyCheckbox isChecked={includeNumbers} setChecked={setIncludeNumbers} label="include numbers" />
            <MyCheckbox isChecked={includeSymbols} setChecked={setIncludeSymbols} label="include symbols" />
          </div>

          <div
            style={{
              padding: "1rem 2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            <div className="strength-container">
              <p style={{fontSize: "1.3rem"}}>Strength</p>
              
              <div style={{display:"flex"}}>
              <div style={{display:"flex", alignItems:"center", justifyContent : "center", gap:10}}>
                  <span style={{fontSize: "1.3rem",}}>{strength == 0 ? "" : strength == 1 ? "WEAK" : strength == 2 ? "GOOD" : strength == 3 ? "STRONG" : strength == 4 ? "SECURE" : ""}</span>
                  {/* Sort the array to show the "true" occurrences fist then loop over the array */}
                  <div style={{display:"flex", gap: 10}}>
                    {strengthArray.sort((a, b) => (a === b ? 0 : a ? -1 : 1)).map((value, index) => (
                      <div key={index} style={{width: 15, height: 30, backgroundColor: value == true ? getColor(strength) : "inherit", border: value == true ? `1px solid ${getColor(strength)}` : "1px solid white", transition:"background 300ms ease"}}>  
                      </div>
                   
                      ))}
                  </div>
                </div>

              </div>
            </div>
            <div>
              <button className={`${strength ? "button active" : "button disabled"}`} onClick={generatePassword}>Generate</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
