import style from "./Profile.module.css";

const Profile = () => {
  return (
    <div className={style.container}>
      <div>
        <label htmlFor="userName">User Name</label>
        <input type="text" id="userName" placeholder="Enter username..." />
        <button>Confirm</button>
      </div>
    </div>
  );
};
export default Profile;
