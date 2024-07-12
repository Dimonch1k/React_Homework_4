import React, { useState, useEffect } from "react";

import "../../../styles/components/productList/Product-Item/Product-Item.scss";

const ProductItem = ({ image, info, price, expire, more }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleReadmore = () => {
    if (showMore) setShowMore(false);
    else setShowMore(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => setShowMore(false));
  }, [showMore]);

  return (
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
      </div>

      <details className="description">
        <summary onClick={() => toggleReadmore()}>
          {showMore ? "Less" : "More"}
        </summary>
        <div className="description__hidden">
          <p className="description__hidden-inner">
            <span>{more.processor}</span> / <span>{more.ram}</span> /{" "}
            <span>{more.storage}</span> / <span>{more.display}</span>
          </p>
        </div>
      </details>
    </ul>
  );
};

export default ProductItem;
