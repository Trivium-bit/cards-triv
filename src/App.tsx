import { HashRouter } from 'react-router-dom';
import './App.css';
import Header from './n1-main/components/Header';
import Routings from './n3-common/Routings';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Header />
        <Routings />
      </HashRouter>

    </div>
  );
}

export default App;
