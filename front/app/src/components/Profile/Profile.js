import React from "react";
import AuthService from "../../services/auth.service";
import "./Profile.css";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div>
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
          <button>Create Request</button>
        </header>
      </div>
      <section class="FlexContainer">
        <div></div>
        <div>List of Requests</div>
        <div>Web Chat</div>
      </section>
    </div>
  );
};

export default Profile;
