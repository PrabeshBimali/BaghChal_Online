import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserContext from "./contexts/UserContext";
import InviteContext from "./contexts/InviteContext";
import Socket from "./contexts/SocketContext";
import Blogspage from "./pages/blog_pages/Blogspage";
import PublishBlog from "./pages/blog_pages/PublishBlog";
import BlogspageMy from "./pages/blog_pages/BlogspageMy";
import ViewBlog from "./pages/blog_pages/ViewBlog";
import Forumpage from "./pages/forum_pages/Forumpage";
import PublishForum from "./pages/forum_pages/PublishForum";
import ProfilePage from "./pages/user_pages/ProfilePage";
import GameHistory from "./pages/user_pages/GameHistory";
import Invitations from "./pages/user_pages/Invitations";
import Gamepage from "./pages/Gamepage";
import AiGamePage from "./pages/AiGamePage";
import NotFound from "./pages/NotFound";
import ViewForum from "./pages/forum_pages/ViewForum";
import ForumpageMy from "./pages/forum_pages/ForumpageMy";
import Tutorialpage from "./pages/Tutorialpage";
import Editblog from "./pages/blog_pages/Editblog";

function App() {
  return (
    <Socket>
      <UserContext>
        <InviteContext>
          <div className="App">
            <Router>
              <Routes>
                <Route path="/" element={<Homepage />}></Route>
                <Route path="login" element={<LoginPage />}></Route>
                <Route path="register" element={<RegisterPage />}></Route>
                <Route path="blogs/all" element={<Blogspage />}></Route>
                <Route path="blogs/my" element={<BlogspageMy />}></Route>
                <Route path="blogs/publish" element={<PublishBlog />}></Route>
                <Route path="blogs/edit/:blogid" element={<Editblog/>}></Route>
                <Route path="blogs/:blogId" element={<ViewBlog />}></Route>
                <Route path="forum/all" element={<Forumpage />}></Route>
                <Route path="forum/publish" element={<PublishForum />}></Route>
                <Route path="forum/my" element={<ForumpageMy/>}></Route>
                <Route path="forum/:forumid" element={<ViewForum/>}></Route>
                <Route path="user/profile" element={<ProfilePage />}></Route>
                <Route path="user/history" element={<GameHistory />}></Route>
                <Route path="user/invites" element={<Invitations />}></Route>
                <Route path="game/:gameId" element={<Gamepage />}></Route>
                <Route path="ai/:gameId" element={<AiGamePage />}></Route>
                <Route path="tutorial" element={<Tutorialpage/>}></Route>
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
            </Router>
          </div>
        </InviteContext>
      </UserContext>
    </Socket>
  );
}

export default App;
