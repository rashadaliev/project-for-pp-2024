import React from "react";
import styles from "../TemplateSelection/TemplateSelection.module.css";
import templateImage1 from "../../assets/templateimg.png";
import templateImage2 from "../../assets/templateimg2.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactDOMServer from "react-dom/server";
import WhiteBusinessTemplate from "../Templates/WhiteBusinessTemplate/WhiteBusinessTemplate";
import BlackRapTemplate from "../Templates/BlackRapTemplate/BlackRapTemplate";
import { BrowserRouter } from "react-router-dom";
const TemplateSelection = (props) => {
  const { nameSite } = props;
  const navigate = useNavigate();
  const chooseTemplate = async (name, description, content) => {
    await axios.post(`http://localhost:5231/api/Project/Edit`, {
      master_Id: JSON.parse(localStorage.getItem("user")).client_id,
      name: name,
      description: description,
      content: content,
    });
  };
  const editDesc = (description) => {
    const content =
      description == "White business"
        ? ReactDOMServer.renderToString(
            <BrowserRouter>
              <WhiteBusinessTemplate />
            </BrowserRouter>
          )
        : ReactDOMServer.renderToStaticMarkup(<BlackRapTemplate />);
    console.log(content);
    chooseTemplate(nameSite, description, content);
  };

  return (
    <div className={styles["container-templateSelection"]}>
      <h1 className={styles["templateSelection__title"]}>
        Выберите макет страницы
      </h1>
      <div className={styles["templates"]}>
        <div
          className={styles.template}
          onClick={(event) => {
            event.stopPropagation();
            editDesc("Black Rap");
            navigate("/projects/BlackRap");
          }}
        >
          <img
            className={styles["template-image"]}
            src={templateImage1}
            alt=""
          />
          <div className={styles["template__footer"]}>
            <p className={styles["template__footer-text_left"]}>Магазин</p>
            <p
              className={`${styles["template__footer-text"]} ${styles["text-bold"]}`}
            >
              Black Rap
            </p>
          </div>
        </div>
        <div
          className={styles.template}
          onClick={(event) => {
            event.stopPropagation();
            editDesc("White business");
            navigate("/projects/WhiteBusiness");
          }}
        >
          <img
            src={templateImage2}
            alt=""
            className={styles["template-image"]}
          />
          <div className={styles["template__footer"]}>
            <p className={styles["template__footer-text_left"]}>Магазин</p>
            <p
              className={`${styles["template__footer-text"]} ${styles["text-bold"]}`}
            >
              White business
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;
