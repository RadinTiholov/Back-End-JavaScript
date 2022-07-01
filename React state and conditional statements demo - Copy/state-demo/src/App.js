import logo from './logo.svg';
import './App.css';
import { Timer } from './components/Timer';
import { Clicker } from './components/Clicker';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Clicker/>
        <Timer startTime = {0}/>
      </header>
    </div>
  );
}

export default App;
