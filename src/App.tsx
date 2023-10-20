import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import MyCheckbox from "./components/Checkbox";
import MySlider from "./components/slider";

enum PasswordStrength {
  "STRONG" = 4,
  "MEDIUM" = 3,
  "NORMAL" = 2,
  "WEAK" = 1
}

function App() {
  const [strength, setStrength] = useState(0)
  const [characterLength, setCharacterLength] = useState(20)
  const [includeUppercase, setIncludeUppercase] = useState(false)
  const [includeLowercase, setIncludeLowercase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const [strengthArray, setStrengthArray] = useState([false, false, false, false])
  
  let strengthValue = 0
  useEffect(() => {
    // an array of all the booleans
    setStrengthArray([includeLowercase, includeUppercase, includeNumbers, includeSymbols])
    // console.log(strengthArray)
    // keeps track of how many of the checkboxes that is checked
    strengthValue = strengthArray.filter(value =>  value === true).length
    setStrength(strengthValue)
    

  }, [includeUppercase, includeLowercase, includeNumbers, includeSymbols])

  const setCharacters = (e : ChangeEvent<HTMLInputElement> ) => {
    setCharacterLength(parseInt(e.target.value))
  }

  return (
    <div className="wrapper">
      <h1 className="title">Password generator</h1>
      <div className="card">
        {/* Generated Password */}
        <div className="password">
          <h3 style={{letterSpacing: "5px", fontSize: "2rem", color:"gray"}}>P4$W0rD</h3>
        </div>
        {/* Password settings */}

        <div className="card-main">
          {/* slider */}
          <div className="slider-container">
            <div className="slider-header">
              <h3>Character length</h3>
              <span>{characterLength}</span>
            </div>
            <MySlider defaultValue={20} onChange={(e) => setCharacters(e)}/>
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
              <p>Strength</p>
              <p>{strength == 0 ? "WEAK" : strength == 1 ? "WEAK" : strength == 2 ? "MEDIUM" : strength == 3 ? "GOOD" : strength == 4 ? "STRONG" : ""}</p>
              <div style={{display:"flex"}}>

              {/* Sort the array to show the "true" occurrences fist then loop over the array */}
              {strengthArray.sort((a, b) => (a === b ? 0 : a ? -1 : 1)).map((value, index) => (
                <h1 key={index} style={ value == true ? {color: "#a5ffaf"} : {color:"gray"}}>#</h1>
              ))}

              </div>
            </div>
            <div>
              <button className="button">Generate</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
