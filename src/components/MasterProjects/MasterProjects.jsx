import React, { useEffect } from "react";
import styles from "../MasterProjects/MasterProjects.module.css";
import { useState } from "react";
import classNames from "classnames";
import WithoutSites from "./WithoutSites/WithoutSites";
import PersonalAreaModal from "../PersonalArea/PersonalAreaModal/PersonalAreaModal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TemplateSelection from "../TemplateSelection/TemplateSelection";
import axios from "axios";
const MasterProjects = () => {
  const location = useLocation();
  const cards = location.state?.cards;
  const infoQA = location.state?.infoQA;
  console.log(infoQA);
  const handleClick = () => {
    const queryString = new URLSearchParams({
      cards: JSON.stringify(cards),
      infoQA: JSON.stringify(infoQA),
    }).toString();
    const url = `/konstruct2?${queryString}`; // изменять konstruct - white bisuness, konstruct2 - blackrap
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    // if (!newWindow) {
    //   navigate("/konstruct", { state: { cards: cards } });
    // }
  };
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [sites, setSites] = useState([]);
  //работает лишь пока с одним сайтом
  const fetchSites = async () => {
    const response = await axios.get(
      `http://localhost:5231/api/Project?Master_id=${
        JSON.parse(localStorage.getItem("user")).client_id
      }`
    );
    if (response.data.name === undefined) {
      return;
    }
    setSites([response.data]);
  };
  // при начале
  useEffect(() => {
    fetchSites();
  }, []);

  const [editing, setEditing] = useState({
    isEditing: false,
    siteName: "",
  });
  const editClick = (siteName) => {
    setEditing((prevState) => ({
      ...prevState,
      isEditing: true,
      siteName: siteName,
    }));
  };

  const deleteSite = (index) => {
    setSites(sites.filter((_, i) => i !== index));
  };
  return (
    <div className={styles.container}>
      <div className={styles["header-container"]}>
        <div className={styles["header-container__title"]}>
          {editing.isEditing ? editing.siteName : "Мои сайты"}
        </div>
        {sites.length !== 0 && (
          <button
            className={classNames(styles["header-container__button"], {
              [styles["btn-editing"]]: editing.isEditing,
            })}
            onClick={() => setOpenModal(true)}
          >
            {editing.isEditing ? (
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 9.375C8.53553 9.375 9.375 8.53553 9.375 7.5C9.375 6.46447 8.53553 5.625 7.5 5.625C6.46447 5.625 5.625 6.46447 5.625 7.5C5.625 8.53553 6.46447 9.375 7.5 9.375Z"
                  stroke="black"
                />
                <path
                  d="M2.28816 6.65C2.58379 6.835 2.77379 7.15125 2.77379 7.5C2.77379 7.84875 2.58379 8.165 2.28816 8.35C2.08754 8.47687 1.95754 8.5775 1.86566 8.6975C1.76572 8.82777 1.69242 8.97646 1.64995 9.13507C1.60749 9.29367 1.59668 9.45909 1.61816 9.62188C1.65066 9.86813 1.79629 10.1206 2.08691 10.625C2.37879 11.1294 2.52441 11.3812 2.72129 11.5331C2.85156 11.6331 3.00025 11.7064 3.15885 11.7488C3.31746 11.7913 3.48288 11.8021 3.64566 11.7806C3.79566 11.7606 3.94754 11.6994 4.15754 11.5881C4.30782 11.5059 4.47655 11.4632 4.64787 11.4641C4.81919 11.4649 4.98747 11.5093 5.13691 11.5931C5.43879 11.7681 5.61816 12.09 5.63066 12.4388C5.63941 12.6763 5.66191 12.8387 5.72004 12.9781C5.78286 13.1299 5.87497 13.2678 5.99111 13.3839C6.10726 13.5001 6.24515 13.5922 6.39691 13.655C6.62629 13.75 6.91754 13.75 7.50004 13.75C8.08254 13.75 8.37379 13.75 8.60316 13.655C8.75492 13.5922 8.89282 13.5001 9.00896 13.3839C9.1251 13.2678 9.21722 13.1299 9.28004 12.9781C9.33754 12.8387 9.36066 12.6763 9.36941 12.4388C9.38191 12.09 9.56129 11.7675 9.86316 11.5931C10.0126 11.5093 10.1809 11.4649 10.3522 11.4641C10.5235 11.4632 10.6922 11.5059 10.8425 11.5881C11.0525 11.6994 11.205 11.7606 11.355 11.7806C11.6836 11.8238 12.0158 11.7348 12.2788 11.5331C12.4757 11.3819 12.6213 11.1294 12.9125 10.625C13.0425 10.4 13.1432 10.2256 13.2182 10.0794M12.7119 8.35063C12.5656 8.26169 12.4443 8.13703 12.3593 7.98835C12.2744 7.83967 12.2286 7.67184 12.2263 7.50063C12.2263 7.15125 12.4163 6.835 12.7119 6.64937C12.9125 6.52312 13.0419 6.4225 13.1344 6.3025C13.2344 6.17223 13.3077 6.02354 13.3501 5.86493C13.3926 5.70633 13.4034 5.54091 13.3819 5.37812C13.3494 5.13187 13.2038 4.87937 12.9132 4.375C12.6213 3.87063 12.4757 3.61875 12.2788 3.46687C12.1485 3.36693 11.9998 3.29363 11.8412 3.25117C11.6826 3.2087 11.5172 3.1979 11.3544 3.21938C11.2044 3.23938 11.0525 3.30063 10.8419 3.41188C10.6917 3.49401 10.5231 3.53664 10.3519 3.53576C10.1807 3.53489 10.0125 3.49054 9.86316 3.40688C9.71595 3.31932 9.5934 3.19578 9.50703 3.04786C9.42066 2.89994 9.37331 2.73249 9.36941 2.56125C9.36066 2.32375 9.33816 2.16125 9.28004 2.02187C9.21722 1.87011 9.1251 1.73222 9.00896 1.61608C8.89282 1.49993 8.75492 1.40782 8.60316 1.345C8.37379 1.25 8.08254 1.25 7.50004 1.25C6.91754 1.25 6.62629 1.25 6.39691 1.345C6.24515 1.40782 6.10726 1.49993 5.99111 1.61608C5.87497 1.73222 5.78286 1.87011 5.72004 2.02187C5.66254 2.16125 5.63941 2.32375 5.63066 2.56125C5.62677 2.73249 5.57941 2.89994 5.49304 3.04786C5.40668 3.19578 5.28413 3.31932 5.13691 3.40688C4.98747 3.49065 4.81919 3.53506 4.64787 3.53594C4.47655 3.53681 4.30782 3.49412 4.15754 3.41188C3.94754 3.30063 3.79504 3.23938 3.64504 3.21938C3.31649 3.17617 2.98422 3.26519 2.72129 3.46687C2.52504 3.61875 2.37879 3.87063 2.08754 4.375C1.95754 4.6 1.85691 4.77438 1.78191 4.92063"
                  stroke="black"
                  stroke-linecap="round"
                />
              </svg>
            ) : (
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.5625 12.5C6.5625 12.7486 6.66127 12.9871 6.83709 13.1629C7.0129 13.3387 7.25136 13.4375 7.5 13.4375C7.74864 13.4375 7.9871 13.3387 8.16291 13.1629C8.33873 12.9871 8.4375 12.7486 8.4375 12.5V8.4375H12.5C12.7486 8.4375 12.9871 8.33873 13.1629 8.16291C13.3387 7.9871 13.4375 7.74864 13.4375 7.5C13.4375 7.25136 13.3387 7.0129 13.1629 6.83709C12.9871 6.66127 12.7486 6.5625 12.5 6.5625H8.4375V2.5C8.4375 2.25136 8.33873 2.0129 8.16291 1.83709C7.9871 1.66127 7.74864 1.5625 7.5 1.5625C7.25136 1.5625 7.0129 1.66127 6.83709 1.83709C6.66127 2.0129 6.5625 2.25136 6.5625 2.5V6.5625H2.5C2.25136 6.5625 2.0129 6.66127 1.83709 6.83709C1.66127 7.0129 1.5625 7.25136 1.5625 7.5C1.5625 7.74864 1.66127 7.9871 1.83709 8.16291C2.0129 8.33873 2.25136 8.4375 2.5 8.4375H6.5625V12.5Z"
                  fill="black"
                />
              </svg>
            )}
            <p className={styles["header-container__button-title"]}>
              {editing.isEditing ? "Настройки сайта" : "Создать сайт"}
            </p>
          </button>
        )}
      </div>
      <div
        className={classNames(styles["katalog"], {
          [styles["zero-sites__center"]]: sites.length === 0,
          [styles["template-selection"]]:
            sites.length !== 0 && editing.isEditing,
        })}
      >
        {sites.length !== 0 ? (
          editing.isEditing ? (
            sites[0].description === null ? (
              <TemplateSelection nameSite={sites[0].name}></TemplateSelection>
            ) : (
              navigate(`/projects/${sites[0].description.replace(/\s+/g, "")}`)
            )
          ) : (
            sites.map((site, index) => (
              <div key={index} className={styles["card-site"]}>
                <button className={styles["choose-theme"]}>
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.0835 12.5C2.0835 6.74688 6.74704 2.08334 12.5002 2.08334C18.2533 2.08334 22.9168 6.74688 22.9168 12.5C22.9168 18.2531 18.2533 22.9167 12.5002 22.9167C6.74704 22.9167 2.0835 18.2531 2.0835 12.5ZM4.16683 12.5C4.16683 14.7101 5.0448 16.8298 6.60761 18.3926C8.17041 19.9554 10.29 20.8333 12.5002 20.8333C14.7103 20.8333 16.8299 19.9554 18.3927 18.3926C19.9555 16.8298 20.8335 14.7101 20.8335 12.5C20.8335 10.2899 19.9555 8.17025 18.3927 6.60745C16.8299 5.04464 14.7103 4.16667 12.5002 4.16667C10.29 4.16667 8.17041 5.04464 6.60761 6.60745C5.0448 8.17025 4.16683 10.2899 4.16683 12.5ZM15.6252 12.5C15.6252 12.0856 15.7898 11.6882 16.0828 11.3951C16.3758 11.1021 16.7733 10.9375 17.1877 10.9375C17.6021 10.9375 17.9995 11.1021 18.2925 11.3951C18.5855 11.6882 18.7502 12.0856 18.7502 12.5C18.7502 12.9144 18.5855 13.3118 18.2925 13.6049C17.9995 13.8979 17.6021 14.0625 17.1877 14.0625C16.7733 14.0625 16.3758 13.8979 16.0828 13.6049C15.7898 13.3118 15.6252 12.9144 15.6252 12.5ZM10.9377 12.5C10.9377 12.0856 11.1023 11.6882 11.3953 11.3951C11.6883 11.1021 12.0858 10.9375 12.5002 10.9375C12.9146 10.9375 13.312 11.1021 13.605 11.3951C13.898 11.6882 14.0627 12.0856 14.0627 12.5C14.0627 12.9144 13.898 13.3118 13.605 13.6049C13.312 13.8979 12.9146 14.0625 12.5002 14.0625C12.0858 14.0625 11.6883 13.8979 11.3953 13.6049C11.1023 13.3118 10.9377 12.9144 10.9377 12.5ZM6.25016 12.5C6.25016 12.0856 6.41478 11.6882 6.70781 11.3951C7.00083 11.1021 7.39826 10.9375 7.81266 10.9375C8.22706 10.9375 8.62449 11.1021 8.91752 11.3951C9.21054 11.6882 9.37516 12.0856 9.37516 12.5C9.37516 12.9144 9.21054 13.3118 8.91752 13.6049C8.62449 13.8979 8.22706 14.0625 7.81266 14.0625C7.39826 14.0625 7.00083 13.8979 6.70781 13.6049C6.41478 13.3118 6.25016 12.9144 6.25016 12.5Z"
                      fill="white"
                    />
                  </svg>
                </button>
                <p className={styles["card-site__title"]}>{site.name}</p>
                <div className={styles["card-site__footer"]}>
                  <button
                    className={styles["footer-menu__el"]}
                    onClick={() => editClick(site.name)}
                  >
                    Редактировать
                  </button>
                  <button
                    className={styles["footer-menu__el"]}
                    onClick={handleClick}
                  >
                    Перейти
                  </button>
                  <button
                    className={`${styles["footer-menu__el"]} ${styles["delete-button"]}`}
                    onClick={() => deleteSite(index)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))
          )
        ) : (
          <WithoutSites setOpenModal={() => setOpenModal(true)}></WithoutSites>
        )}
      </div>
      <PersonalAreaModal
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
        onSiteCreated={fetchSites}
      ></PersonalAreaModal>
    </div>
  );
};

export default MasterProjects;
