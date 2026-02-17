import { useState } from "react";
import { useAlerts } from "../../store/alerts-context";
import { useAuth } from "../../auth/AuthProvider";
import style from "./Profile.module.css";

const Profile = () => {
  const { loggedOnUser, handleUserNameChange } = useAuth();
  const { handleAlert } = useAlerts();

  let currentName = loggedOnUser.user_metadata.display_name || loggedOnUser.email.split("@")[0];

  const [newUserName, setNewUserName] = useState(currentName);

  if (!currentName) {
    currentName = loggedOnUser.email.split("@")[0];
  }

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
          disabled={newUserName.length === 0 || currentName === newUserName}
          onClick={() => {
            handleUserNameChange(newUserName);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};
export default Profile;
