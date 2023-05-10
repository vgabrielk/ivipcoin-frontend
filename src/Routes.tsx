import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignIn from "./pages/SignIn"
import Tasks from "./pages/Tasks"
import DialogComponent from "./components/Dialog"

function RoutesComponent() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>

        {window.location.pathname == '/login' ? null : <DialogComponent /> }
      </BrowserRouter>
    </>
  )
}

export default RoutesComponent
