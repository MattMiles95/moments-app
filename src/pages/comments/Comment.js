import React, { useState } from "react";

import { axiosRes } from "../../api/axiosDefaults";

import Card from "react-bootstrap/Card";
import Avatar from "../../components/Avatar";

import styles from "../../styles/Comment.module.css";

import { Link } from "react-router-dom";

import { useCurrentUser } from "../../context/CurrentUserContext";

import CommentEditForm from "./CommentEditForm";
import MoreDropdown from "../../components/MoreDropdown";

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setPost,
    setComments,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <hr />
      <Card>
        <Card.Body className="d-flex align-items-start">
          <Link to={`/profiles/${profile_id}`} className="me-3">
            <Avatar src={profile_image} />
          </Link>

          {/* Main content container */}
          <div className="flex-grow-1 d-flex justify-content-between align-items-start">
            {/* Content column */}
            <div>
              <span className={styles.Owner}>{owner}</span>
              <span className={styles.Date}>{updated_at}</span>
              {showEditForm ? (
                <CommentEditForm
                  id={id}
                  profile_id={profile_id}
                  content={content}
                  profileImage={profile_image}
                  setComments={setComments}
                  setShowEditForm={setShowEditForm}
                />
              ) : (
                <p>{content}</p>
              )}
            </div>

            {/* MoreDropdown column */}
            {is_owner && (
              <div className="mt-1">
                {" "}
                {/* mt-1 to match baseline of owner/date spans */}
                <MoreDropdown
                  handleEdit={() => setShowEditForm(true)}
                  handleDelete={handleDelete}
                />
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default Comment;
