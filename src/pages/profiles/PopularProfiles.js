// React
import React from "react";

// Bootstrap
import { Container } from "react-bootstrap";

// Context
import { useProfileData } from "../../context/ProfileDataContext";

// CSS
import appStyles from "../../App.module.css";

// Local Components
import Asset from "../../components/Asset";
import Profile from "./Profile";

const PopularProfiles = ({ mobile }) => {
  const { popularProfiles } = useProfileData();

  return (
    <div>
      <Container
        className={`${appStyles.Content} ${mobile && "d-lg-none text-center"}`}
      >
        {popularProfiles.results.length ? (
          <>
            <p>Popular Profiles.</p>
            {mobile ? (
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
          </>
        ) : (
          <Asset spinner />
        )}
      </Container>
    </div>
  );
};

export default PopularProfiles;
