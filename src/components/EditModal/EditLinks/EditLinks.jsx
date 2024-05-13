import React from "react";

const EditLinks = (props) => {
  const { links, setLinks } = props;
  const handleTitleChange = (event) => {
    setLinks({ ...links, title: event.target.value });
  };
  const handleLinkTgChange = (event) => {
    setLinks({ ...links, tg: event.target.value });
  };
  const handleLinkVkChange = (event) => {
    setLinks({ ...links, vk: event.target.value });
  };
  return (
    <div>
      <input type="text" value={links.title} onChange={handleTitleChange} />
      <input type="text" value={links.tg} onChange={handleLinkTgChange} />
      <input type="text" value={links.vk} onChange={handleLinkVkChange} />
    </div>
  );
};

export default EditLinks;
