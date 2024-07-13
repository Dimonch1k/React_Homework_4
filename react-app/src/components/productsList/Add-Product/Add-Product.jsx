import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import "../../../styles/components/productList/Add-Product/Add-Product.scss";

import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/Button";
import { Link } from "lucide-react";

const AddProduct = ({ addNewProduct }) => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [imgName, setImgName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

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

  // document
  //   .getElementById("fileInput")
  //   .addEventListener("change", function (event) {
  //     const filePath = event.target.value;
  //     const fileName = filePath.split("\\").pop();
  //   });

  const addProduct = (data) => {
    // if (isEmptyFields(data)) return;

    // let img = document.getElementById("img");
    // const img_path = `C:\\Users\\dmytro\\Desktop\\Git\\React_Homework_4\\react-app\\src\\images\\${img.target.value
    //   .split("\\")
    //   .pop()}`;

    const newProduct = {
      id: Math.random(),
      image: `C:\\Users\\dmytro\\Desktop\\Git\\React_Homework_4\\react-app\\src\\images\\${data.img.name}`,
      info: data.info.value,
      expire: data.expires,
      price: data.price.value,
      more: {
        processor: data.processor.value,
        ram: data.ram.value,
        storage: data.storage.value,
        display: data.display.value,
      },
    };

    const values = data.img.name;

    console.log(newProduct);
    console.log(values);

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

  useEffect(() => {
    localStorage.setItem("dataKey", JSON.stringify(data));
  }, [data]);

  return (
    <>
      <label data-action-label="Choose Files">Choose file</label>

      {!show && <Button onClick={() => setShow(true)}>Add product</Button>}
      <Toast
        className="add-product-popup"
        show={show}
        onClose={() => setShow(false)}
      >
        <button
          onClick={() => setShow(false)}
          style={{ position: "absolute", top: "5px", right: "5px" }}
        >
          ✕
        </button>
        <Toast.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const data = Object.fromEntries(formData.entries());
              addProduct(data);
              setShow(false);
            }}
          >
            <fieldset>
              <label htmlFor="img">Upload image:</label>
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
              <label htmlFor="info">Enter info about product:</label>
              <input id="info" name="info" type="text" required />
            </fieldset>
            <hr />

            <fieldset style={{ display: "flex" }}>
              <label style={{ width: "auto", margin: "0" }}>Expires:</label>

              <div className="product-expiration">
                <input id="expires-true" name="expires" type="radio" />
                <label htmlFor="expires">Yes</label>

                <input
                  id="expires-false"
                  name="expires"
                  type="radio"
                  defaultChecked
                />
                <label htmlFor="expires">No</label>
              </div>
            </fieldset>
            <hr />

            {/* Price */}
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
