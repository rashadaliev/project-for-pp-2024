import React from "react";
import styles from "../EditInformationQA/EditInformationQA.module.css";
const EditInformationQA = (props) => {
  const { infoQA, setInfoQA } = props;
  const handleTitleChange = (e) => {
    setInfoQA({ ...infoQA, title: e.target.value });
  };
  const handleFontChange = (e) => {
    setInfoQA({ ...infoQA, font: e.target.value });
  };
  const handleFontSizeChange = (e) => {
    setInfoQA({ ...infoQA, fontSize: e.target.value });
  };
  const handleFontWeightChange = (e) => {
    setInfoQA({ ...infoQA, fontWeight: e.target.value });
  };

  const handleSectionTitleChange = (index, newTitle) => {
    const newSections = [...infoQA.sections];
    newSections[index].title = newTitle;
    setInfoQA({ ...infoQA, sections: newSections });
  };

  const handleSectionContentChange = (index, newContent) => {
    const newSections = [...infoQA.sections];
    newSections[index].content = newContent;
    setInfoQA({ ...infoQA, sections: newSections });
  };
  const handleAddSection = () => {
    const newSection = {
      id: infoQA.sections.length + 1,
      title: "Новый раздел",
      content: "",
      open: false,
    };
    setInfoQA({ ...infoQA, sections: [...infoQA.sections, newSection] });
  };
  const handleDeleteSection = (indexToDelete) => {
    const newSections = infoQA.sections.filter(
      (_, index) => index !== indexToDelete
    );
    setInfoQA({ ...infoQA, sections: newSections });
  };
  return (
    <div className={styles.infoQa}>
      <input
        type="text"
        value={infoQA.title}
        onChange={handleTitleChange}
        className={styles.infoQATitle}
        styles={{
          fontFamily: infoQA.font,
          fontSize: infoQA.fontSize,
          fontWeight: infoQA.fontWeight,
        }}
      />

      <div>
        <label>
          Шрифт:
          <input type="text" value={infoQA.font} onChange={handleFontChange} />
        </label>
      </div>
      <div>
        <label>
          Размер шрифта:
          <input
            type="text"
            value={infoQA.fontSize}
            onChange={handleFontSizeChange}
          />
        </label>
      </div>
      <div>
        <label>
          Толщина шрифта:
          <select value={infoQA.fontWeight} onChange={handleFontWeightChange}>
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="bolder">Bolder</option>
            <option value="lighter">Lighter</option>
          </select>
        </label>
      </div>

      {infoQA.sections.map((section, index) => (
        <div key={section.id} className={styles.qaSection}>
          <input
            type="text"
            value={section.title}
            onChange={(e) => handleSectionTitleChange(index, e.target.value)}
            className={styles.sectionQATitle}
          />
          <textarea
            value={section.content}
            onChange={(e) => handleSectionContentChange(index, e.target.value)}
            className={styles.qaContent}
          />
          <button onClick={() => handleDeleteSection(index)}>Удалить</button>
        </div>
      ))}

      <button onClick={handleAddSection}>Добавить раздел</button>
    </div>
  );
};

export default EditInformationQA;
