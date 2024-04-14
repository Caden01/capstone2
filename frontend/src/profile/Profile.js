import React, { useContext } from "react";
import UserContext from "../auth/UserContext";

function Profile() {
  const { currentUser } = useContext(UserContext);
  console.debug("Profile", "currentUser=", currentUser);

  return (
    <div>
      <h1>{currentUser.username}</h1>
      <h3>First Name: {currentUser.firstName}</h3>
      <h3>Last Name: {currentUser.lastName}</h3>
      <h3>Email: {currentUser.email}</h3>
    </div>
  );
}

export default Profile;
