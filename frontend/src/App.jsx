/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {Routes,Route, Navigate} from 'react-router-dom';
import Home from './pages/home/HomePage';
import Signup from './pages/SignUpPage';
import Login from './pages/LoginPage';
import {Toaster} from 'react-hot-toast';
import { useAuthStore } from '../store/authUser';
import { useEffect } from 'react';
import WatchPage from './pages/WatchPage';
import SearchPage from './pages/SearchPage';
import HistoryPage from './pages/HistoryPage';



function App(){
  const {user,isCheckingAuth,authCheck}=useAuthStore();
  useEffect(()=>{
    authCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (

    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={user?<Navigate to={'/'}/>:<Login/>}/>
      <Route path='/signup' element={user?<Navigate to={'/'}/>:<Signup/>} />
      <Route path='/watch/:id' element ={user? <WatchPage/>:<Navigate to={'/login'}/>}/>
      <Route path='/search' element ={user? <SearchPage/>:<Navigate to={'/login'}/>}/>
      <Route path='/history' element ={user? <HistoryPage/>:<Navigate to={'/login'}/>}/>
      <Route path='/*' element ={user? <HistoryPage/>:<Navigate to={'/login'}/>}/>
    </Routes>
    <Toaster/>

    </>
    )
}

export default App;