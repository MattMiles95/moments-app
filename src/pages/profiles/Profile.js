// React
import React from "react";

// Bootstrap Components
import { Button } from "react-bootstrap";

// Context
import { useCurrentUser } from "../../context/CurrentUserContext";

// CSS
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";

// Local Components
import Avatar from "../../components/Avatar";

// React Router
import { Link } from "react-router-dom";

const Profile = (props) => {
  const { profile, mobile, imageSize = 55 } = props;
  const { id, following_id, image, owner } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>
        <Link to={`/profiles/${id}`}>
          <strong>{owner}</strong>
        </Link>
      </div>
      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {!mobile &&
          currentUser &&
          !is_owner &&
          (following_id ? (
            <Button
              className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
              onClick={() => {}}
            >
              unfollow
            </Button>
          ) : (
            <Button
              className={`${btnStyles.Button} ${btnStyles.Black}`}
              onClick={() => {}}
            >
              follow
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Profile;
