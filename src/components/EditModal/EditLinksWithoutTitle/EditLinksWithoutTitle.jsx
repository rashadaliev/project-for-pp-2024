import React from "react";

const EditLinksWithoutTitle = (props) => {
  const { linksWithoutTitle, setLinksWithoutTitle } = props;
  const handleChangeLink = (event, id) => {
    const { name, value } = event.target;
    const updatedLinks = linksWithoutTitle.map((link) =>
      link.id === id ? { ...link, [name]: value } : link
    );
    setLinksWithoutTitle(updatedLinks);
  };
  const handleIconTypeChange = (event, id) => {
    const { value } = event.target;
    const updatedLinks = linksWithoutTitle.map((link) =>
      link.id === id ? { ...link, iconType: value } : link
    );
    setLinksWithoutTitle(updatedLinks);
  };
  const handleAddLink = (selectedIcon) => {
    const newLink = {
      id: linksWithoutTitle.length + 1,
      iconType: selectedIcon,
      link: "",
      customIcon: "",
    };
    setLinksWithoutTitle([...linksWithoutTitle, newLink]);
  };
  const handleDeleteLink = (id) => {
    const updatedLinks = linksWithoutTitle.filter((link) => link.id !== id);
    setLinksWithoutTitle(updatedLinks);
  };
  const handleFileUpload = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newLinks = linksWithoutTitle.map((el) =>
          el.id === id ? { ...el, customIcon: reader.result } : el
        );
        setLinksWithoutTitle(newLinks);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <div>
        {linksWithoutTitle.map((el) => (
          <div key={el.id}>
            <p>{el.id}</p>
            <div>
              <input
                type="text"
                name="link"
                value={el.link}
                onChange={(e) => handleChangeLink(e, el.id)}
              />
              <select
                value={el.iconType}
                onChange={(e) => handleIconTypeChange(e, el.id)}
              >
                <option value="email">Email</option>
                <option value="vk">VK</option>
                <option value="tg">Telegram</option>
                <option value="logo">Logo</option>
              </select>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, el.id)}
              />
              <button onClick={() => handleDeleteLink(el.id)}>X</button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={() =>
            handleAddLink(document.querySelector("#icons_select").value)
          }
        >
          Добавить
        </button>
        <select id="icons_select">
          <option value="email">Email</option>
          <option value="vk">VK</option>
          <option value="tg">Telegram</option>
          <option value="logo">Logo</option>
        </select>
      </div>
    </>
  );
};

export default EditLinksWithoutTitle;
