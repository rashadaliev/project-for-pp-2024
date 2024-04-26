import React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import StartedPage from "./components/StartedPage/StartedPage";
import RegistrationPage from "./components/RegistrationPage/RegistrationPage";
import LoginPage from "./components/LoginPage/LoginPage";
import ProfileMaster from "./components/ProfileMaster/ProfileMaster";
import PersonalAreaHeader from "./components/PersonalArea/PersonalAreaHeader/PersonalAreaHeader";
import MasterProjects from "./components/MasterProjects/MasterProjects";
import MasterCRM from "./components/MasterCRM/MasterCRM";
const App = () => {
  const navigate = useNavigate();
  return (
    <>
      {localStorage.length != 0 ? (
        <PersonalAreaHeader></PersonalAreaHeader>
      ) : (
        ""
      )}
      <Routes>
        {localStorage.length != 0 ? (
          <Route path="/projects" element={<MasterProjects></MasterProjects>} />
        ) : (
          <Route path="/" element={<StartedPage></StartedPage>} />
        )}
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/profile" element={<ProfileMaster></ProfileMaster>} />
        <Route path="/crm" element={<MasterCRM />}></Route>
      </Routes>
    </>
  );
};

export default App;
