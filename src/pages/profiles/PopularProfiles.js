// React
import React, { useEffect, useState } from "react";

// API
import { axiosReq } from "../../api/axiosDefaults";

// Bootstrap
import { Container } from "react-bootstrap";

// CSS
import appStyles from "../../App.module.css";

// Context
import { useCurrentUser } from "../../context/CurrentUserContext";

// Assets
import Asset from "../../components/Asset";

const PopularProfiles = () => {
  const [profileData, setProfileData] = useState({
    // we will use the pageProfile later!
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });
  const { popularProfiles } = profileData;
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=followers_count"
        );
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
      } catch (err) {
        console.error(err);
      }
    };

    handleMount();
  }, [currentUser]);

  return (
    <div>
      <Container className={appStyles.Content}>
        <p className="font-weight-bold">Popular Profiles</p>
        {!popularProfiles.results.length ? (
          <Asset spinner />
        ) : (
          popularProfiles.results.map((profile) => (
            <p key={profile.id}>{profile.owner}</p>
          ))
        )}
      </Container>
    </div>
  );
};

export default PopularProfiles;
