import "./ProfileImage.css";

export default function ProfileImage({ userPfp, size }) {
  return (
    <div
      className="profile-image-container"
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: userPfp }}
    />
  );
}
