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
import ArchivePage from "./components/ArchivePage/ArchivePage";
import HeaderCRM from "./components/MasterCRM/HeaderCRM/HeaderCRM";
import StatisticPage from "./components/StatisticPage/StatisticPage";
import ReadySiteBlackRap from "./components/ReadySite/ReadySiteBlackRap/ReadySiteBlackRap";
const App = () => {
  const [selectedSection, setSelectedSection] = useState();
  const location = useLocation();
  const pathsToExcludeFromHeader = ["/konstruct"];
  const pathToIncludeForCrmHeader = ["/crm", "/archive", "/statistic"];
  const pathsToExcludePersonalAreaHeader = ["/", "/registration", "/login"];
  return (
    <>
      {!localStorage.length ||
      !pathsToExcludeFromHeader.includes(location.pathname) ? (
        pathToIncludeForCrmHeader.includes(location.pathname) ? (
          <>
            <PersonalAreaHeader
              selectedSection={selectedSection}
              setSelectedSection={setSelectedSection}
            />
            <HeaderCRM />
          </>
        ) : (
          <>
            {!pathsToExcludePersonalAreaHeader.includes(location.pathname) && (
              <PersonalAreaHeader
                selectedSection={selectedSection}
                setSelectedSection={setSelectedSection}
              />
            )}
          </>
        )
      ) : null}
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
        <Route path="/statistic" element={<StatisticPage />}></Route>
        <Route path="/archive" element={<ArchivePage></ArchivePage>}></Route>
        <Route path="/projects/BlackRap" element={<BlackRapTemplate />}></Route>
        <Route
          path="/projects/WhiteBusiness"
          element={<WhiteBusinessTemplate />}
        ></Route>
        <Route path="/konstruct" element={<ReadySite></ReadySite>}></Route>
        <Route
          path="/konstruct2"
          element={<ReadySiteBlackRap></ReadySiteBlackRap>}
        ></Route>
        <Route path="/order" element={<OrderCRM></OrderCRM>}></Route>
      </Routes>
    </>
  );
};

export default App;
