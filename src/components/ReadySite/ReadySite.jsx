import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import ModalCart from "../Templates/WhiteBusinessTemplate/ModalCart/ModalCart";
import { useLocation } from "react-router-dom";
const ReadySite = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const cards = JSON.parse(params.get("cards"));
  const [cartCount, setCartCount] = useState(0);
  const [goods, setGoods] = useState([]);
  const [siteContent, setSiteContent] = useState(null);
  const [openCartModal, setOpenCartModal] = useState(false);
  const handleCartClick = () => {
    setOpenCartModal(true);
  };

  const addToCart = (id, name, price, image, desc) => {
    setCartCount(cartCount + 1);
    if (goods[id - 1]) {
      goods[id - 1].count += 1;
    } else {
      const newGood = {
        id: id,
        name: name,
        price: price,
        image: image,
        count: 1,
        desc: desc,
      };
      setGoods([...goods, newGood]);
    }
  };
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
      const elementsToRemove = doc.querySelectorAll(
        "._modal-container_r0u9z_1._open_r0u9z_17, .btn-ready"
      );
      elementsToRemove.forEach((element) => element.remove());

      const blockCardsElement = doc.querySelector(".block-cards");
      if (blockCardsElement) {
        blockCardsElement.innerHTML = cards
          .map(
            (card) =>
              `<div class="card" data-id=${card.id}>
            <img class="card__title" src=${card.image} alt="" />
            <p class="card__price">${card.price} р.</p>
            <p class="card__desc">${card.name}</p>
            <button
              class="card__btn-buy"
            >
              <p class="card__btn-title">Купить</p>
              <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.25 1.875L1.41563 1.93C2.24063 2.205 2.65313 2.3425 2.88875 2.67C3.125 2.9975 3.125 3.4325 3.125 4.30187V5.9375C3.125 7.705 3.125 8.58938 3.67438 9.13813C4.22313 9.6875 5.1075 9.6875 6.875 9.6875H11.875"
                    stroke="black"
                    stroke-linecap="round"
                  />
                  <path
                    d="M4.6875 11.25C4.93614 11.25 5.1746 11.3488 5.35041 11.5246C5.52623 11.7004 5.625 11.9389 5.625 12.1875C5.625 12.4361 5.52623 12.6746 5.35041 12.8504C5.1746 13.0262 4.93614 13.125 4.6875 13.125C4.43886 13.125 4.2004 13.0262 4.02459 12.8504C3.84877 12.6746 3.75 12.4361 3.75 12.1875C3.75 11.9389 3.84877 11.7004 4.02459 11.5246C4.2004 11.3488 4.43886 11.25 4.6875 11.25ZM10.3125 11.25C10.5611 11.25 10.7996 11.3488 10.9754 11.5246C11.1512 11.7004 11.25 11.9389 11.25 12.1875C11.25 12.4361 11.1512 12.6746 10.9754 12.8504C10.7996 13.0262 10.5611 13.125 10.3125 13.125C10.0639 13.125 9.8254 13.0262 9.64959 12.8504C9.47377 12.6746 9.375 12.4361 9.375 12.1875C9.375 11.9389 9.47377 11.7004 9.64959 11.5246C9.8254 11.3488 10.0639 11.25 10.3125 11.25Z"
                    stroke="black"
                  />
                  <path
                    d="M6.875 5.625H5"
                    stroke="black"
                    stroke-linecap="round"
                  />
                  <path
                    d="M3.125 3.75H10.2812C11.5656 3.75 12.2081 3.75 12.4862 4.17125C12.7637 4.59312 12.5112 5.18313 12.005 6.36375L11.7369 6.98875C11.5006 7.54 11.3825 7.815 11.1481 7.97C10.9131 8.125 10.6131 8.125 10.0137 8.125H3.125"
                    stroke="black"
                  />
                </svg>
            </button>
          </div>`
          )
          .join("");
      }

      const serializer = new XMLSerializer();
      const updatedHtml = serializer.serializeToString(doc);

      setSiteContent(updatedHtml);
    };

    fetchSite();
  }, []);

  useEffect(() => {
    const btnCart = document.querySelector(".btn-cart");
    if (btnCart) {
      btnCart.addEventListener("click", handleCartClick);
    }
    const btnCartRelative = document.querySelector(".button-cart-relative");
    if (btnCartRelative) {
      const cartCountSpan = document.createElement("span");
      cartCountSpan.className =
        "cart-count" + (cartCount > 0 ? " visible" : "");
      cartCountSpan.textContent = cartCount.toString();
      btnCartRelative.replaceChild(cartCountSpan, btnCartRelative.children[1]);
    }

    // btnCartRelative.childNodes[1].innerHTML(`
    //
    // `);
  }, [siteContent, cartCount]);

  useEffect(() => {
    const handleCartClick = (event) => {
      const cardId = event.currentTarget
        .closest(".card")
        .getAttribute("data-id");

      const card = cards.find((card) => {
        return card.id === +cardId;
      });
      if (card) {
        addToCart(card.id, card.name, card.price, card.image, card.desc);
      }
    };
    const btnsBuy = document.querySelectorAll(".card__btn-buy");

    btnsBuy.forEach((btn) => {
      btn.addEventListener("click", handleCartClick);
    });
  }, [cards]);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: siteContent }} />

      <ModalCart
        goods={goods}
        openCartModal={openCartModal}
        close={() => setOpenCartModal(false)}
        setGoods={setGoods}
        cartCount={cartCount}
        setCartCount={setCartCount}
      ></ModalCart>
    </>
  );
};

export default ReadySite;
