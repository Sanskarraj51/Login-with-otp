import React from "react";

const Home = ({ signOut, user ,title}) => {
  console.log(user);
  return (
    <div className="wrapper">
      <h1 className="main-heading">Welcome 👋, {user.phoneNumber}</h1>
      <button className="main-button" id="signOut" onClick={signOut}>
        {title}
      </button>
    </div>
  );
};

export default Home;