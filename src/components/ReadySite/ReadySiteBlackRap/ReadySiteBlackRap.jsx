import "../ReadySiteBlackRap/ReadySiteBlackRap.css";
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import ShoppingCartModal from "../../EditModal/ShoppingCartModal/ShoppingCartModal";
import ModalCard from "../../ModalCard/ModalCard";

const ReadySiteBlackRap = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const cards = JSON.parse(params.get("cards"));
  const infoQA = JSON.parse(params.get("infoQA"));
  const [openCardModal, setOpenCardModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  function renderSections() {
    const divqa = document.createElement("div");
    divqa.classList.add("info-qa");
    divqa.innerHTML = infoQA
      .map(
        (section) => `
        <div class="qa-section" data-id="${section.id}">
          <div class="qa-header">
            <h3 class="qa-title">${section.title}</h3>
            <button class="qa-toggle-btn" data-id="${section.id}">
              ${section.open ? "−" : "+"}
            </button>
          </div>
          ${section.open ? `<p class="qa-content">${section.content}</p>` : ""}
        </div>
      `
      )
      .join("");

    const containerInfo = document.querySelector('[class*="container-info"]');
    while (containerInfo.children.length > 1) {
      containerInfo.removeChild(containerInfo.lastChild);
    }
    containerInfo.appendChild(divqa);

    // Добавляем обработчики событий для кнопок
    document.querySelectorAll(".qa-toggle-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const id = parseInt(this.getAttribute("data-id"));
        handleToggle(id);
      });
    });
  }
  function handleToggle(id) {
    const section = infoQA.find((section) => section.id === id);
    section.open = !section.open;
    renderSections();
  }
  const handleClickCardForMoreDetails = (event) => {
    const parentBtnBuy = event.target.closest("[class*='card__btn-buy']");

    if (parentBtnBuy) {
      return;
    }
    setOpenCardModal(true);

    const cardId = event.currentTarget.getAttribute("data-id");
    setSelectedCard({
      name: cards[cardId - 1].name,
      image: cards[cardId - 1].image,
      price: cards[cardId - 1].price,
      desc: cards[cardId - 1].desc,
    });
  };
  const handleClickShoppingCart = () => {
    setCart((prevCart) => ({
      ...prevCart,
      isOpen: !prevCart.isOpen,
    }));
  };

  const [cart, setCart] = useState({
    goods: [],
    generalCount: 0,
    isOpen: false,
  });
  const addToCart = (id, name, price, image, desc) => {
    setCart((prevCart) => {
      const existingGoodIndex = prevCart.goods.findIndex(
        (good) => good.id === id
      );
      let newGoods;

      if (existingGoodIndex !== -1) {
        newGoods = prevCart.goods.map((good, index) =>
          index === existingGoodIndex
            ? { ...good, count: good.count + 1 }
            : good
        );
      } else {
        const newGood = {
          id: id,
          name: name,
          price: price,
          image: image,
          count: 1,
          desc: desc,
        };
        newGoods = [...prevCart.goods, newGood];
      }

      return {
        goods: newGoods,
        generalCount: prevCart.generalCount + 1,
      };
    });
  };
  // const location = useLocation();
  // const params = new URLSearchParams(location.search);
  // const cards = JSON.parse(params.get("cards"));
  const [siteContent, setSiteContent] = useState(null);
  useEffect(() => {
    const fetchSite = async () => {
      const response = await axios.get(
        `http://localhost:5231/api/Project?Master_id=${
          JSON.parse(localStorage.getItem("user")).client_id
        }`,
        {
          params: {
            id: JSON.parse(localStorage.getItem("user")).client_id,
          },
        }
      );

      const parser = new DOMParser();
      const doc = parser.parseFromString(response.data.content, "text/html");
      //
      const elementsToRemove = doc.querySelectorAll(
        ".btn-ready, ._modal-container_r0u9z_1, ._info-qa_tkax9_77"
      );
      elementsToRemove.forEach((element) => element.remove());
      if (document.querySelector('[class*="container-info"]')) {
        renderSections();
      }
      const serializer = new XMLSerializer();
      const updatedHtml = serializer.serializeToString(doc);

      setSiteContent(updatedHtml);
      const cardsElements = document.querySelectorAll('[class*="card"]');
      cardsElements.forEach((cardEl) => {
        cardEl.addEventListener("click", handleClickCardForMoreDetails);
      });
      return () => {
        cardsElements.forEach((cardEl) => {
          cardEl.removeEventListener("click", handleClickCardForMoreDetails);
        });
      };
    };
    fetchSite();
  }, []);
  useEffect(() => {
    const shopping_cart = document.querySelector('[class*="shopping-cart"]');
    if (shopping_cart) {
      shopping_cart.addEventListener("click", handleClickShoppingCart);
    }
    return () => {
      if (shopping_cart) {
        shopping_cart.removeEventListener("click", handleClickShoppingCart);
      }
    };
  }, [siteContent]);

  useEffect(() => {
    const cardBtnBuys = document.querySelectorAll('[class*="card__btn-buy"]');
    cardBtnBuys.forEach((cardBtnBuy) => {
      cardBtnBuy.addEventListener("click", () => {
        let titleCard = "";
        cardBtnBuy.parentNode.childNodes.forEach((el) => {
          if (el.nodeName == "P" && el.classList[0].includes("card__title")) {
            titleCard = el.textContent;
          }
        });
        const card = cards.find((card) => card.name === titleCard);
        addToCart(card.id, card.name, card.price, card.image, card.desc);
      });
    });
    // {cart.generalCount != 0 && <p>{cart.generalCount}</p>}

    // return () => {
    //   if (cardBtnBuy) {
    //     cardBtnBuy.removeEventListener("click", handleClickBuy);
    //   }
    // };
  }, [siteContent]);
  useEffect(() => {
    const shoppingCart = document.querySelector('[class*="shopping-cart"]');

    if (shoppingCart) {
      const existingCountElement = shoppingCart.querySelector("p");
      if (existingCountElement) {
        shoppingCart.removeChild(existingCountElement);
      }

      if (cart.generalCount !== 0) {
        const countElement = document.createElement("p");
        countElement.textContent = cart.generalCount;
        shoppingCart.insertBefore(countElement, shoppingCart.firstChild);
      }
    }
  }, [cart.generalCount, siteContent]);

  return (
    <>
      <div className="container" dangerouslySetInnerHTML={{ __html: siteContent }} />
      <ShoppingCartModal cart={cart} setCart={setCart}></ShoppingCartModal>
      <ModalCard
        openCardModal={openCardModal}
        close={() => setOpenCardModal(false)}
        card={selectedCard}
      ></ModalCard>
    </>
  );
};

export default ReadySiteBlackRap;
