// React
import React, { useEffect, useState } from "react";

// API
import { axiosReq } from "../../api/axiosDefaults";

// Bootstrap
import { Container } from "react-bootstrap";

// Context
import { useCurrentUser } from "../../context/CurrentUserContext";

// CSS
import appStyles from "../../App.module.css";

// Local Components
import Asset from "../../components/Asset";
import Profile from "./Profile";

const PopularProfiles = ({ mobile }) => {
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
      <Container
        className={`${appStyles.Content} ${mobile && "d-lg-none text-center"}`}
      >
        <p className="font-weight-bold">Popular Profiles</p>
        {!popularProfiles.results.length ? (
          <Asset spinner />
        ) : mobile ? (
          <div className="d-flex justify-content-around">
            {popularProfiles.results.slice(0, 4).map((profile) => (
              <Profile key={profile.id} profile={profile} mobile />
            ))}
          </div>
        ) : (
          popularProfiles.results.map((profile) => (
            <Profile key={profile.id} profile={profile} />
          ))
        )}
      </Container>
    </div>
  );
};

export default PopularProfiles;
