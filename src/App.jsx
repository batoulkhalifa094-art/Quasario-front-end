import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { Sign_in , Register , Home} from './Pages'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Register />} /> //الصفحة الاولى بالظهور

        <Route path="/Sign_in" element={<Sign_in />} />

        <Route path="/Home" element={<Home />}>
          /* منحط كلشي عن ب صفحة ال Home شو ممكن يكون عنا Routes */
        </Route>

       

        {/* صفحة الخطأ في حال تم إدخال رابط غير موجود */}
        <Route path="*" element={<div>page not found</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
  