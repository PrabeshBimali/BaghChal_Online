import "./BlogspageLayout.css";
import { NavLink } from "react-router-dom";
import HomePageLayout from "../HomePageLayout";

export default function Blogspage({ children }) {


  return (
    <HomePageLayout>
        <div className="blogspage_container">
          <div className="blogspage_header">
            <NavLink exact to="/blogs/all" className="blogspage_link">
              Community Blogs
            </NavLink>
            <NavLink exact to="/blogs/my" className="blogspage_link">
              Your Blogs
            </NavLink>
            <NavLink exact to="/blogs/publish" className="blogspage_link">
              Publish Blog
            </NavLink>
          </div>
          <div className="blogs_container">{children}</div>
        </div>
    </HomePageLayout>
  );
}
