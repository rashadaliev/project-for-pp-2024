import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import StartedPage from "./components/StartedPage/StartedPage";
import RegistrationPage from "./components/RegistrationPage/RegistrationPage";
import LoginPage from "./components/LoginPage/LoginPage";
import PersonalArea from "./components/PersonalArea/PersonalArea";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<StartedPage></StartedPage>} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/projects" element={<PersonalArea></PersonalArea>} />
    </Routes>
  );
};

export default App;
