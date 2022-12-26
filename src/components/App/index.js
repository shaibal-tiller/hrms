import { BrowserRouter } from 'react-router-dom'
import Router from '../Router';
import AppContext from './Context';
import { useState } from 'react';
import '../../styles/App.css'
import Header from '../../shared/Header';
import Footer from '../../shared/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [dt, setDt] = useState()
  const data = {
    dt, setDt
  }
  return (
    <AppContext.Provider value={data}>
      <BrowserRouter>
        <div className='App'>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light" />
          <Router />
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
