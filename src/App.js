import './App.css';
import Header from './Pages/Header/Header';
import Home from './Pages/Home/Home'
import AddInfo from './Pages/Add Info/AddInfo';
import UpdateInfo from './Pages/Update Info/UpdateInfo';
import { Routes,Route } from 'react-router-dom';
function App() {
  return (
    <div>
      <Header></Header>
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/add/info' element={<AddInfo></AddInfo>}></Route>
      <Route path='/update/info/:id' element={<UpdateInfo></UpdateInfo>}></Route>
    </Routes>
    </div>
  );
}

export default App;
