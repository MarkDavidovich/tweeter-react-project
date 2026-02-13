import { useState } from "react";
import style from "./Profile.module.css";

const Profile = ({ userName, onUserNameChange }) => {
  const [newUserName, setNewUserName] = useState(userName);

  return (
    <div className={style.container}>
      <div>
        <label htmlFor="userName">User Name</label>
        <input
          type="text"
          id="userName"
          placeholder="Enter new username..."
          value={newUserName}
          onChange={(ev) => {
            setNewUserName(() => ev.target.value);
          }}
        />
        <button
          disabled={userName === newUserName || newUserName.length === 0}
          onClick={() => {
            onUserNameChange(newUserName);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};
export default Profile;
