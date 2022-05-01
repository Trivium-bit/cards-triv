import { HashRouter } from 'react-router-dom';
import './App.css';
import Header from './n1-main/components/Header';
import Routings from './n1-main/components/Routings';

function App() {
  return (
    <div className="App">
        <Header />
        <Routings />
    </div>
  );
}

export default App;
