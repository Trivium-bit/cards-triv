import { HashRouter } from 'react-router-dom';
import './App.css';
import Header from './n1-main/components/Header';
import Routes from './n3-common/Routes';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Header />
        <Routes />
      </HashRouter>

    </div>
  );
}

export default App;
