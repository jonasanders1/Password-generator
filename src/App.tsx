import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import MyCheckbox from "./components/Checkbox";
import MySlider from "./components/slider";

enum PasswordStrength {
  "STRONG",
  "MEDIUM",
  "NORMAL",
  "WEAK",
}

function App() {
  const [strength, setStrength] = useState(0)
  const [characterLength, setCharacterLength] = useState(20)
  const [includeUppercase, setIncludeUppercase] = useState(false)
  const [includeLowercase, setIncludeLowercase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const [strengthArray, setStrengthArray] = useState([false, false, false, false])
  const [password, setPassword] = useState('')
  
  useEffect(() => {
    // array for the booleans
    const newStrengthArray = [includeLowercase, includeUppercase, includeNumbers, includeSymbols];
    // array that just stores the true values
    const newStrength = newStrengthArray.filter(value => value === true).length;
  
    setStrengthArray(newStrengthArray);
    setStrength(newStrength);

  }, [includeUppercase, includeLowercase, includeNumbers, includeSymbols]);
  
  const setCharacters = (e : ChangeEvent<HTMLInputElement> ) => {
    setCharacterLength(parseInt(e.target.value))
  }


  
  const generatePassword = () => {
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
          <h3 style={{letterSpacing: "5px", fontSize: "2rem", color:"gray", padding:"1rem"}}>{password ? password : "P4$w0RD"}</h3>
          <div className="copy-container">
            <span>copy</span>
          </div>
        </div>
        {/* Password settings */}

        <div className="card-main">
          {/* slider */}
          <div className="slider-container">
            <div className="slider-header">
              <h3>Character length</h3>
              <span>{characterLength}</span>
            </div>
            <MySlider min={0} max={25} defaultValue={20} onChange={(e) => setCharacters(e)}/>
          </div>
          {/* Checkbox */}
          <div>
            <MyCheckbox isChecked={includeUppercase} setChecked={setIncludeUppercase} label="include uppercase letters"  />
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
                  <span style={{fontSize: "1.3rem"}}>{strength == 0 ? "WEAK" : strength == 1 ? "NORMAL" : strength == 2 ? "GOOD" : strength == 3 ? "STRONG" : strength == 4 ? "STRONG" : ""}</span>
                  {/* Sort the array to show the "true" occurrences fist then loop over the array */}
                  <div style={{display:"flex", gap: 10}}>
                    {strengthArray.sort((a, b) => (a === b ? 0 : a ? -1 : 1)).map((value, index) => (
                      <div key={index} style={{width: 15, height: 30, backgroundColor: value == true ? "#f5ce6a" : "inherit", border: value == true ? "1px solid #f5ce6a" : "1px solid white", transition:"background 300ms ease"}}></div>
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
