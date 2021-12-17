export default function Profile(props) {
  return (
    <div>
      <div className="profile-screen">
        <ul>
          <li className="profile-action"></li>
          <li className="profile-action"></li>
        </ul>
      </div>

      <div
        className="close-button"
        onClick={() => props.setIsOpen(false)}
      ></div>
    </div>
  );
}
