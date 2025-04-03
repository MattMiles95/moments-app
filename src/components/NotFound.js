// React
import React from "react";

// Assets
import NoResults from "../assets/no-results.png";

// CSS
import styles from "../styles/NotFound.module.css";

// Local Components
import Asset from "../components/Asset";

// React Router
import { Link } from "react-router-dom";

const NotFound = () => {
    const goHomeMessage = (
        <div>
            <p>Sorry, the page you're looking for doesn't exist.</p>
            <p>Click here to head back.</p>
        </div>
    );
        
  return (
    <div className={`${styles.NotFoundStyle} text-center`}>
      <Link to="/">
        <Asset
          src={NoResults}
          message={goHomeMessage}
        />
      </Link>
    </div>
  );
};

export default NotFound;
