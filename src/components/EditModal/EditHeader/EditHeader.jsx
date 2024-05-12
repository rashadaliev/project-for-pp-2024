import React from "react";

const EditHeader = (props) => {
  const { updateImage } = props;
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <label htmlFor="image"></label>
      <input id="image" type="file" onChange={handleImageUpload} />
    </>
  );
};

export default EditHeader;
