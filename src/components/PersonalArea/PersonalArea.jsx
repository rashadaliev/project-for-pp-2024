import React from "react";
import { useState } from "react";
import PersonalAreaHeader from "./PersonalAreaHeader/PersonalAreaHeader";
import PersonalAreaBody from "./PersonalAreaBody/PersonalAreaBody";
const PersonalArea = () => {
  const [selectedSection, setSelectedSection] = useState("Мой сайт");
  return (
    <div>
      <PersonalAreaHeader
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      ></PersonalAreaHeader>
      <PersonalAreaBody selectedSection={selectedSection}></PersonalAreaBody>
    </div>
  );
};

export default PersonalArea;
