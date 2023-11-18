import React from "react";
import ReactDOM from "react-dom/client";
import StarRating from "./StarRating";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      maxRating={5}
      defaultRating={3}
      starSize="80px"
      messages={["shocking", "rubbish", "decent", "good", "awesome"]}
      fontSize="2rem"
    ></StarRating>
    <StarRating
      maxRating={10}
      color="red"
      className="test"
      starSize="2rem"
    ></StarRating>
    <StarRating /> */}
  </React.StrictMode>
);
