import "./BlogspageLayout.css";
import { NavLink } from "react-router-dom";
import HomePageLayout from "../HomePageLayout";

export default function Blogspage({ children }) {
  return (
    <HomePageLayout>
        <div className="blogspage_container">
          <div className="blogspage_header">
            <NavLink to="/blogs" className="blogspage_link">
              Community Blogs
            </NavLink>
            <NavLink to="/blogs/liked" className="blogspage_link">
              Liked Blogs
            </NavLink>
            <NavLink to="/blogs/my" className="blogspage_link">
              Your Blogs
            </NavLink>
            <NavLink to="/blogs/commented" className="blogspage_link">
              Commented Blogs
            </NavLink>
            <NavLink to="/blogs/publish" className="blogspage_link">
              Publish Blog
            </NavLink>
          </div>
          <div className="blogs_container">{children}</div>
        </div>
    </HomePageLayout>
  );
}
