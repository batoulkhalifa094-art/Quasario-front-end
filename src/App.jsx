import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Sign_in, Register, Home, SavedProfiles, MyProfile, OwnerDashboard, AdminDashboard, BannedUsers, ManageEvents, TrustRequests } from './Pages'
import RequireAuth from './Components/RequireAuth'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Register />} />
        <Route path="/Sign_in" element={<Sign_in />} />

        {/* protected routes */}
        {/*  مسارات محمية للمستخدم فقط ( User) */}
        <Route element={<RequireAuth allowedRoles={['user']} />}>
          <Route path="/Home" element={<Home />} />
          <Route path="/saved-profiles" element={<SavedProfiles />} />
        </Route>

        {/*  مسارات محمية لصاحب العمل (Owner) والأدمن المترقي (Admin) معاً */}
        <Route element={<RequireAuth allowedRoles={['owner', 'admin']} />}>
          <Route path="/MyProfile" element={<MyProfile />} />
          <Route path="/ManageEvents" element={<ManageEvents />} />
          <Route path="/OwnerDashboard" element={<OwnerDashboard />} />
        </Route>

        {/*  مسارات محمية وحصرية للوحة الإدارة (Admin Only) */}
        <Route element={<RequireAuth allowedRoles={['admin']} />}>
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/BannedUsers" element={<BannedUsers />} />
          <Route path="/TrustRequests" element={<TrustRequests />} />
        </Route>


        {/* صفحة الخطأ في حال تم إدخال رابط غير موجود */}
        <Route path="*" element={<div>page not found</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
