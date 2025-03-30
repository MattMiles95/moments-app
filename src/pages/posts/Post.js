import React from "react";

import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { Chat } from "react-bootstrap-icons";
import { Heart } from "react-bootstrap-icons";
import { HeartFill } from "react-bootstrap-icons";

import Avatar from "../../components/Avatar";

import styles from "../../styles/Post.module.css";

import { useCurrentUser } from "../../context/CurrentUserContext";
import { Link } from "react-router-dom";

import { axiosRes } from "../../api/axiosDefaults";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    title,
    content,
    image,
    updated_at,
    postPage,
    setPosts,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <div className="d-flex align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && postPage && "..."}
          </div>
        </div>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger placement="top" overlay={<Tooltip>You can't like your own post!</Tooltip>}>
              <Heart className="mr-1" size={20} />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnlike}>
              <HeartFill className={`mr-1 ${styles.Heart}`} size={20} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <Heart className={`mr-1 ${styles.HeartOutline}`} size={20} />
            </span>
          ) : (
            <OverlayTrigger placement="top" overlay={<Tooltip>Log in to like posts!</Tooltip>}>
              <Heart className="mr-1" size={20} />
            </OverlayTrigger>
          )}
          {likes_count}
          <Link to={`/posts/${id}`}>
            <Chat className="ml-4 mr-1" size={20} />
          </Link>
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;
