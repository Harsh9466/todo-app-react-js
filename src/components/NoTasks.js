import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/animations/56438-man-with-task-list.json";

const NoTasks = (props) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <div className="no-task-container text-center d-flex flex-column justify-content-center align-items-center  w-100">
        <div className="m-0 no-task p-0 lottie">
          <Lottie
            style={{ cursor: "default", userSelect: "none" }}
            options={defaultOptions}
            isClickToPauseDisabled
          />
          <h6>{props?.title || "Add your Tasks"}</h6>
        </div>
      </div>
    </>
  );
};

export default NoTasks;
