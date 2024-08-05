import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ItemCategories from "../FormUpdate/ItemCategories";



function CreateProduct() {
  const [namePro, setNamePro] = useState();
  const [price, setPrice] =useState();
  const size = ["S", "M", "L"];
  const [category, setCategory] = useState();
  const [imagePro, setImagePro] = useState();
  const navi = useNavigate();

  const handleClickCategory = (item) => {
    setCategory(item.target.value);
  }

  const Submit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/createpro", {namePro, size, price, imagePro, category})
    .then(result => {
      console.log(result) 
      navi("/adminPage")
    })
    .catch(err => console.log(err))
  }

  return (
    <>
      <div class="w-[50%] mx-auto bg-gray-400 p-6 rounded-md shadow-md">
        <h1 class="text-2xl font-semibold mb-4">Thêm Sản Phẩm</h1>
        <form
          onSubmit={Submit}
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
            <img src={!imagePro ? ("https://i.pinimg.com/236x/d8/68/48/d86848cf828d989955711050a7645dc5.jpg"):(imagePro)} className="w-32" />
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
              Thêm sản phẩm
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default CreateProduct;
