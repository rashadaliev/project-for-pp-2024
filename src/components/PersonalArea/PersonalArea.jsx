import React from "react";
import PersonalAreaHeader from "./PersonalAreaHeader/PersonalAreaHeader";
import { useLocation } from "react-router-dom";
const PersonalArea = () => {
  const location = useLocation();
  const { NAME } = location.state;
  return (
    <div>
      <PersonalAreaHeader name={NAME}></PersonalAreaHeader>
    </div>
  );
};

export default PersonalArea;
