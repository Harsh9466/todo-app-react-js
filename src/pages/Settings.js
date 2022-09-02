import { Settings24Regular } from "@fluentui/react-icons";
import React from "react";
import Content from "../components/Content";

const Setting = () => {
  return (
    <>
      <Content
        header
        title="Settings"
        icon={<Settings24Regular className="me-3" />}
      ></Content>
    </>
  );
};

export default Setting;
