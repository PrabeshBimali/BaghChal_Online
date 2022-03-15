import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserContext from "./contexts/UserContext";
import Socket from "./contexts/SocketContext";

function App() {
  return (
    <Socket>
      <UserContext>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<Homepage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/register" element={<RegisterPage />}></Route>
            </Routes>
          </Router>
        </div>
      </UserContext>
    </Socket>
  );
}

export default App;
