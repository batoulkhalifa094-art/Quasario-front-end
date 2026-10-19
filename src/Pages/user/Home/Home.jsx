import { Outlet } from 'react-router-dom'
import './Home.css'
import {Nav , Footer} from '../../../Components'
import { useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();
  
  const customMessage = location.state?.message; 

  return (
    <div className="home-page-container">
      
      {/*  إظهار التنبيه بأعلى الصفحة الرئيسية فور طرده */}
      {customMessage && (
        <div className="home-error-alert">
          {customMessage}
        </div>
      )}
      <h2>Home page</h2>
      <Nav />
      
      
      <Outlet /> 
      <Footer />
    </div>
  )
}

export default Home