import React from "react";
import styles from "../ProfileMaster/ProfileMaster.module.css";
const ProfileMaster = () => {
  return (
    <div>
      <div>
        <p>Имя</p>
        <input
          value={JSON.parse(localStorage.getItem("user")).username}
        ></input>
      </div>
    </div>
  );
};

export default ProfileMaster;
