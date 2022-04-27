import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserContext from "./contexts/UserContext";
import Socket from "./contexts/SocketContext";
import Blogspage from "./pages/blog_pages/Blogspage";
import BlogspageCommented from "./pages/blog_pages/BlogspageCommented";
import PublishBlog from "./pages/blog_pages/PublishBlog";
import BlogspageMy from "./pages/blog_pages/BlogspageMy";
import ViewBlog from "./pages/blog_pages/ViewBlog";
import Forumpage from "./pages/forum_pages/Forumpage";
import PublishForum from "./pages/forum_pages/PublishForum";
import Gamepage from "./pages/Gamepage";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <Socket>
      <UserContext>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<Homepage />}></Route>
              <Route path="login" element={<LoginPage />}></Route>
              <Route path="register" element={<RegisterPage />}></Route>
              <Route path='blogs' element={<Blogspage />}></Route>
              <Route path='blogs/commented' element={<BlogspageCommented/>}></Route>
              <Route path='blogs/my' element={<BlogspageMy/>}></Route>
              <Route path='blogs/publish' element={<PublishBlog/>}></Route>
              <Route path="blogs/:blogId" element={<ViewBlog/>}></Route>
              <Route path="forum" element={<Forumpage/>}></Route>
              <Route path="forum/publish" element={<PublishForum/>}></Route>
              <Route path="game/:gameId" element={<Gamepage/>}></Route>
              <Route path="*" element={<NotFound/>}></Route>
            </Routes>
          </Router>
        </div>
      </UserContext>
    </Socket>
  );
}

export default App;
