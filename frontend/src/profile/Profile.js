import React, { useContext } from "react";
import UserContext from "../auth/UserContext";

export const TOKEN = "token";

function Profile() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  console.debug("Profile", "currentUser=", currentUser);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div class="card mt-5" style={{ width: "18rem" }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
          class="card-img-top"
          alt="profile picture"
        />
        <div class="card-body">
          <h3 class="card-title">{currentUser.username}</h3>
          <h5 class="card-title">{currentUser.firstName}</h5>
          <h5 class="card-title">{currentUser.lastName}</h5>
          <h5 class="card-title">{currentUser.email}</h5>
        </div>
      </div>
    </div>
  );
}

export default Profile;
