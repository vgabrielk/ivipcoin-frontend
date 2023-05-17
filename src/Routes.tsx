import { BrowserRouter, Route, Routes } from "react-router-dom"
import Tasks from "./pages/Tasks"
import DialogComponent from "./components/Dialog"
import TaskStore from "./pages/TaskStore"
import TaskShow from "./pages/TaskShow"

function RoutesComponent() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Tasks />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/create" element={<TaskStore />} />
          <Route path="/task/:id" element={<TaskShow />} />
        </Routes>

        {window.location.pathname == '/login' ? null : <DialogComponent /> }
      </BrowserRouter>
    </>
  )
}

export default RoutesComponent
