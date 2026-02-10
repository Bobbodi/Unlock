import "./ProfileImage.css";

export default function ProfileImage({ userPfp, size }) {
  return (
    <div
      className="profile-image-container"
      style={{ width: size, height: size }}
    >
      <img
        src={userPfp}
        alt="Profile"
        className="profile-image"
      />
    </div>
  );
}