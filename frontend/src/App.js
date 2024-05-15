import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import Create from "./components/Create"
import Update from "./components/Update"
import ImageUpload from "./components/ImageUpload"
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/image-upload" element={<ImageUpload />} />

      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)
