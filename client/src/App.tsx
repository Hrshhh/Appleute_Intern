import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { publicRoutes } from './route/routes';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <BrowserRouter>
      <ToastContainer autoClose={1000} position='top-center' />
      <Routes>
        {publicRoutes.map((routecomp: any, index: number) => (
          <Route
            path={routecomp.path}
            element={<routecomp.component />}
            key={index}
          />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App
