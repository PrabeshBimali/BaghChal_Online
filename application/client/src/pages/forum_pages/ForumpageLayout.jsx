import "./ForumpageLayout.css";
import { NavLink } from "react-router-dom";
import HomePageLayout from "../HomePageLayout";

export default function ForumpageLayout({ children }) {
  return (
    <HomePageLayout>
        <div className="forumpage_container">
          <div className="forumpage_header">
            <NavLink to="/forum/all" className="forumpage_link">
              Community Forum
            </NavLink>
            <NavLink to="/forum/my" className="forumpage_link">
              Your Forum
            </NavLink>
            <NavLink to="/forum/publish" className="forumpage_link">
              Publish Forum
            </NavLink>
          </div>
          <div className="forum_container">{children}</div>
        </div>
    </HomePageLayout>
  );
}
