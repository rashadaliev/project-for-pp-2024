import React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import StartedPage from "./components/StartedPage/StartedPage";
import RegistrationPage from "./components/RegistrationPage/RegistrationPage";
import LoginPage from "./components/LoginPage/LoginPage";
import ProfileMaster from "./components/ProfileMaster/ProfileMaster";
import PersonalAreaHeader from "./components/PersonalArea/PersonalAreaHeader/PersonalAreaHeader";
import MasterProjects from "./components/MasterProjects/MasterProjects";
import MasterCRM from "./components/MasterCRM/MasterCRM";
import BlackRapTemplate from "./components/Templates/BlackRapTemplate/BlackRapTemplate";
import WhiteBusinessTemplate from "./components/Templates/WhiteBusinessTemplate/WhiteBusinessTemplate";
import ReadySite from "./components/ReadySite/ReadySite";
import OrderCRM from "./components/MasterCRM/OrderCRM/OrderCRM";
import { useLocation } from "react-router-dom";
const App = () => {
  const [selectedSection, setSelectedSection] = useState();
  const location = useLocation();
  const pathsToExcludeFromHeader = ["/konstruct"];
  return (
    <>
      {!localStorage.length ||
        (!pathsToExcludeFromHeader.includes(location.pathname) && (
          <PersonalAreaHeader
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
          />
        ))}
      <Routes>
        {localStorage.length != 0 ? (
          <Route path="/projects" element={<MasterProjects></MasterProjects>} />
        ) : (
          <Route path="/" element={<StartedPage></StartedPage>} />
        )}
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/profile" element={<ProfileMaster></ProfileMaster>} />
        <Route
          path="/crm"
          element={<MasterCRM setSelectedSection={setSelectedSection} />}
        ></Route>
        <Route path="/projects/BlackRap" element={<BlackRapTemplate />}></Route>
        <Route
          path="/projects/WhiteBusiness"
          element={<WhiteBusinessTemplate />}
        ></Route>
        <Route path="/konstruct" element={<ReadySite></ReadySite>}></Route>
        <Route path="/order" element={<OrderCRM></OrderCRM>}></Route>
      </Routes>
    </>
  );
};

export default App;
