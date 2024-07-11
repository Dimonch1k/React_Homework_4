import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

import "../../../styles/components/productList/Product-Item/Product-Item.scss";
import { SeparatorVertical } from "lucide-react";

const ProductItem = ({ image, info, price, expire, more }) => {
  const [readmore, setReadmore] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", (e) => setReadmore(false));
  }, [readmore]);

  return (
    <>
      <ul className="product">
        <div className="product__content">
          <li className="product__item product__image">
            <img src={image} alt="product-image" />
          </li>
          <li className="product__item product__info">{info}</li>

          <li
            className=" product__item product__expire"
            style={{ color: expire ? "#ff5c00" : "#00a046" }}
          >
            {expire ? "Expires" : "In stock"}
          </li>
          <li className="product__item product__price">{price}₴</li>

          <button onClick={() => setReadmore(!readmore)}>
            {readmore ? "Less" : "More"}
          </button>
        </div>

        <div className={`description ${readmore && "visible"}`}>
          <div className={"description__hidden-content"}>
            heello
            <p className="description__hidden-inner">
              {more.processor} / {more.ram} / {more.storage} / {more.display}
            </p>
          </div>
        </div>
      </ul>
    </>
  );
};

export default ProductItem;
