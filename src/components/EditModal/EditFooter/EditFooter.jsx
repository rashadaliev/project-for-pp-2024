import React from "react";

const EditFooter = (props) => {
  const { footer, setFooter } = props;
  const handleMailChange = (event) => {
    setFooter({
      ...footer,
      mail: event.target.value,
      hrefMail: `mailto:${event.target.value}`,
    });
  };

  const handleTextAreaChange = (event) => {
    setFooter({ ...footer, textArea: event.target.value });
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFooter({ ...footer, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <input type="text" value={footer.mail} onChange={handleMailChange} />
      <textarea
        style={{ resize: "both" }}
        value={footer.textArea}
        onChange={handleTextAreaChange}
      />
      <input id="image" type="file" onChange={handleImageUpload} />
    </div>
  );
};

export default EditFooter;
