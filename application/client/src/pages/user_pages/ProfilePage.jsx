import React, { useContext, useEffect, useState } from "react";
import UserPageLayout from "./UserPageLayout";
import "./ProfilePage.css";
import { AccountContext } from "../../contexts/UserContext";

export default function ProfilePage() {
  const { user } = useContext(AccountContext);

  const [userDetail, setUserDetail] = useState({});
  const [usernameUpdate, setUsernameUpdate] = useState("");
  const [emailUpdate, setEmailUpdate] = useState("");
  const [updateError, setUpdateError] = useState("");

  async function handleUpdate(){
    try{

    }catch(error){
      console.log("Error while updating profile")
      console.log(error.message)
    }
  }

  useEffect(() => {
    async function fetchData() {
      console.log("fuck");
      try {
        const response = await fetch("http://localhost:5000/user/profile", {
          mode: "cors",
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUserDetail(data.payload.user);
          console.log("OK");
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchData();
  }, []);

  return (
    <UserPageLayout>
      <div className="profile_page">
        <div className="profile_header">
          <div className="profile_title">User Profile</div>
          <div className="profile_image"></div>
        </div>
        <div className="profile_body">
          <div className="profile_detail">
            <p>
              Username: <span>{user.username}</span>
            </p>
            <p>
              Your Id: <span>{userDetail.userid}</span>
            </p>
            <p>
              Email: <span>{userDetail.email}</span>
            </p>
            <p>
              Created On: <span>{userDetail.datecreated}</span>
            </p>
          </div>
          <div className="profile_form">
            <div className="update_username">
              <span>Change Username: </span>
              <input
                type="text"
                minLength={5}
                maxLength={25}
                placeholder="username..."
                value={usernameUpdate}
                onChange={(e) => setUsernameUpdate(e.target.value)}
              ></input>
            </div>
            <div className="update_email">
              <span>Change Email: </span>
              <input
                type="email"
                placeholder="email..."
                onChange={(e) => setEmailUpdate(e.target.value)}
                value={emailUpdate}
              ></input>
            </div>
            <div className="update_profile_button">
              <button>Update</button>
            </div>
          </div>
        </div>
        <div className="profile_footer"></div>
      </div>
    </UserPageLayout>
  );
}
