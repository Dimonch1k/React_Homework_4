import React, { useState } from "react";
import ProductItem from "./Product-Item/Product-Item";
import AddProduct from "./Add-Product/Add-Product";

import Container from "react-bootstrap/Container";

import { taskList } from "./productList";

import "../../styles/components/productList/Product-List.scss";

const ProductsList = () => {
  const [products, setProducts] = useState(taskList);

  const addNewProduct = (product) => {
    setProducts([...products, product]);

    // setProducts([...products, {}])
  };

  return (
    <div>
      <Container className="p-3">
        <div className="catalog-settings">
          {/* Add Product */}
          <AddProduct addNewProduct={addNewProduct} />

          {/* Sorting */}

          {/*  */}
        </div>
        <div className="product-list">
          {products.map((task) => (
            <ProductItem
              key={task.id}
              image={task.image}
              info={task.info}
              price={task.price}
              expire={task.expire}
              more={task.more}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ProductsList;
