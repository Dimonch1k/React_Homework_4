import React, { useState, useEffect } from "react";
// import { Formik, Field, Form } from "formik";

import "../../../styles/components/productList/Add-Product/Add-Product.scss";

import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/Button";

const AddProduct = ({ addNewProduct }) => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const [fields, setFields] = useState({
    img: "",
    info: "",
    expire: false,
    price: "",
    processor: "",
    ram: "",
    storage: "",
    display: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const addProduct = (data) => {
    if (isEmptyFields(data)) return;

    const newProduct = {
      id: Math.random(),
      image: data.img,
      info: data.info,
      expire: data.expire,
      price: data.price,
      more: {
        processor: data.processor,
        ram: data.ram,
        storage: data.storage,
        display: data.display,
      },
    };

    // Clear all fields
    // clearFields();

    // Send data to localStorage to verify if data can be stored into list
    // setData([...data, newProduct]);

    // Add new product
    addNewProduct({ ...newProduct });
  };

  // Check if all fields are filled
  const isEmptyFields = (data) => {
    const inputs = {
      info: data.info,
      price: data.price,
      processor: data.processor,
      ram: data.ram,
      storage: data.storage,
      display: data.display,
    };
    console.log(data.img);

    return Object.values(inputs).some((input) => input === "");
  };

  // Check if file is image file
  const matchFileType = (file) => {
    const extension = getExtension(file).toLowerCase();
    return /^(jpg|jpeg|png|gif|webp|tiff|bmp)$/.test(extension);
  };

  // Get extension of some files
  const getExtension = (file) => {
    return file.split(".").pop();
  };

  // Set placeholder notification for empty fields
  // const notifyPlaceholders = (fields, fieldsIndexes) => {
  //   const placeholders = [
  //     "Enter product info",
  //     "Enter price",
  //     "Enter processor model",
  //     "Enter RAM size",
  //     "Enter storage size",
  //     "Enter display size",
  //   ];
  //   fieldsIndexes.forEach((index) => {
  //     fields[index].placeholder = `${placeholders[index]} (must be filled)`;
  //   });
  // };

  const clearFields = () => {
    setFields({
      img: "",
      info: "",
      expire: false,
      price: "",
      processor: "",
      ram: "",
      storage: "",
      display: "",
    });
  };

  useEffect(() => {
    localStorage.setItem("dataKey", JSON.stringify(data));
  }, [data]);

  return (
    <>
      {!show && <Button onClick={() => setShow(true)}>Add product</Button>}
      <Toast
        className="add-product-popup"
        show={show}
        onClose={() => setShow(false)}
      >
        <Toast.Header>
          <strong className="mr-auto">Add a new product to the list</strong>
        </Toast.Header>

        <Toast.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const data = Object.fromEntries(formData.entries());
              console.log(data);
              addProduct(data);
              setShow(false);
            }}
          >
            <fieldset>
              <label htmlFor="img">
                Upload image: <em>*</em>
              </label>
              <input
                id="img"
                name="img"
                type="file"
                accept="image/*"
                required
              />
            </fieldset>
            <hr />

            <fieldset>
              <label htmlFor="info">
                Enter info about product: <em>*</em>
              </label>
              <input id="info" name="info" type="text" required />
            </fieldset>
            <hr />

            <fieldset style={{ display: "flex" }}>
              <label style={{ width: "auto", margin: "0" }}>Expires:</label>

              <div className="product-expiration">
                <input id="expires-true" name="expires" type="radio" />
                <label htmlFor="expires">Yes</label>

                <input id="expires-false" name="expires" type="radio" defaultChecked />
                <label htmlFor="expires">No</label>
              </div>
            </fieldset>
            <hr />

            <fieldset>
              <label htmlFor="price">Price:</label>
              <input id="price" name="price" type="text" required />
            </fieldset>
            <hr />

            {/* Processor */}
            <fieldset>
              <label htmlFor="processor">Processor:</label>
              <input id="product-processor" name="processor" type="text" />
            </fieldset>
            <hr />

            {/* RAM */}
            <fieldset>
              <label htmlFor="ram">RAM:</label>
              <input id="product-ram" name="ram" type="text" />
            </fieldset>
            <hr />

            {/* Storage */}
            <fieldset>
              <label htmlFor="storage">Storage:</label>
              <input id="product-storage" name="storage" type="text" />
            </fieldset>
            <hr />

            {/* Display */}
            <fieldset>
              <label htmlFor="display">Display:</label>
              <input id="product-display" name="display" type="text" />
            </fieldset>
            <hr />

            {/* Submit Button */}
            <Button type="submit" size="sm" style={{ width: "100%" }}>
              Add
            </Button>
          </form>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default AddProduct;