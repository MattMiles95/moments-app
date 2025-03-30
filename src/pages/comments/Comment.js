import React from "react";

import Card from "react-bootstrap/Card";
import Avatar from "../../components/Avatar";

import styles from "../../styles/Comment.module.css";

import { Link } from "react-router-dom";

const Comment = (props) => {
  const { owner, profile_id, profile_image, content, updated_at } = props;

  return (
    <div>
      <hr />
      <Card>
        <Card.Body className="d-flex align-items-start">
          <Link to={`/profiles/${profile_id}`} className="me-3">
            <Avatar src={profile_image} />
          </Link>

          <div className="flex-grow-1">
            <span className={styles.Owner}>{owner}</span>
            <span className={styles.Date}>{updated_at}</span>
            <p>{content}</p>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Comment;
