import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Main from './components/home/Main';
import Cart from './components/cart/Cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
    <BrowserRouter>
    <ToastContainer autoClose={1000} position='top-center'/>
      <Routes>
        <Route path="/" element={<Main />}/> 
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
    
      
    </>
  )
}

export default App
