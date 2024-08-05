import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ItemCategories from "./ItemCategories";

function UpdateProduct() {
  const { productId } = useParams();
  const [namePro, setNamePro] = useState();
  const [price, setPrice] = useState();
  const [imagePro, setImagePro] = useState();
  const [category, setCategory] = useState();
  const navi = useNavigate();

  const handleClickCategory = (item) => {
    setCategory(item.target.value);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getproducts/${productId}`)
      .then((product) => {
        console.log(product);
        setNamePro(product.data.namePro);
        setPrice(product.data.price);
        setImagePro(product.data.imagePro);
        setCategory(product.data.category);
      })
      .catch((err) => console.log(err));
  }, []);

  const Update = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/updatepro/${productId}`, {
        namePro,
        price,
        category,
        imagePro,
      })
      .then((result) => {
        console.log(result);
        navi("/qlproducts");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div class="w-[50%] mx-auto bg-gray-400 p-6 rounded-md shadow-md">
        <h1 class="text-2xl font-semibold mb-4">Cập Nhật Sản Phẩm</h1>
        <form
          onSubmit={Update}
          action="/update-product"
          method="post"
          enctype="multipart/form-data"
        >
          <div class="mb-4">
            <label
              for="product_name"
              class="block text-sm font-medium text-gray-700"
            >
              Tên Sản Phẩm
            </label>
            <input
              type="text"
              id="product_name"
              name="product_name"
              value={namePro}
              onChange={(e) => setNamePro(e.target.value)}
              class="mt-1 p-2 block w-full border rounded-md"
              required
            />
          </div>
          <div class="mb-4">
            <label
              for="product_price"
              class="block text-sm font-medium text-gray-700"
            >
              Giá Sản Phẩm
            </label>
            <input
              type="number"
              id="product_price"
              name="product_price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              class="mt-1 p-2 block w-full border rounded-md"
              required
            />
          </div>
          {/* Thể loại */}
          <ItemCategories value={category} onChange={handleClickCategory} />

          <div class="mb-4">
            <label
              for="product_image"
              class="block text-sm font-medium text-gray-700"
            >
              Hình Sản Phẩm
            </label>
            <img src={imagePro} className="w-32" />
            <input
              type="file"
              id="product_image"
              name="product_image"
              class="mt-1 block"
              onChange={(e) => {
                const selectedImage = URL.createObjectURL(e.target.files[0]);
                setImagePro(selectedImage);
              }}
              accept="image/*"
            />
          </div>
          <div class="mt-6">
            <button
              type="submit"
              class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Cập Nhật
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default UpdateProduct;
