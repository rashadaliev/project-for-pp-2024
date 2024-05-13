import React from "react";

const EditAboutStore = (props) => {
  const { info, setInfo } = props;
  const handleTitleChange = (event) => {
    setInfo({ ...info, title: event.target.value });
  };

  const handleDescriptionChange = (event) => {
    setInfo({ ...info, description: event.target.value });
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <input type="text" value={info.title} onChange={handleTitleChange} />
      <textarea
        style={{ resize: "both" }}
        value={info.description}
        onChange={handleDescriptionChange}
      />
    </div>
  );
};

export default EditAboutStore;
