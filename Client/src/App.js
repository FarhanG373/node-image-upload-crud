import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import Registor from './Components/Registor/Registor';
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/registor' element={<Registor />} />
      </Routes>
    </div>
  );
}

export default App;
