import "./App.css";
import MyCheckbox from "./components/Checkbox";
import MySlider from "./components/slider";
function App() {
  return (
    <div>
      <h1 className="title">Password generator</h1>
      <div className="card">
        {/* Generated Password */}
        <div className="password">
          <h3>PTx1f5DaFX</h3>
        </div>
        {/* Password settings */}

        <div className="card-main">
          {/* slider */}
          <div className="slider-container">
            <div className="slider-header">
              <h3>Character length</h3>
              <span>0</span>
            </div>
            <MySlider defaultValue={0} />
          </div>
          {/* Checkbox */}
          <div>
            <MyCheckbox label="include uppercase letters" />
            <MyCheckbox label="include lowercase letters" />
            <MyCheckbox label="include numbers" />
            <MyCheckbox label="include symbols" />
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
              <p>@@@@</p>
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
