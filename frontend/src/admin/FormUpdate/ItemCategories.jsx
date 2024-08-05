import React, { useEffect, useState } from "react";
import axios from "axios";

const ItemCategories = ({value, onChange}) => {
  const [categories, setCategory] = useState([]);
  
  const handleClickCategory = (e) => {
    onChange(e); // Call the onChange function passed as a prop
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/getcategories")
      .then((categori) => setCategory(categori.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div class="mb-4">
      <label
        for="product_category"
        class="block text-sm font-medium text-gray-700"
      >
        Thể Loại
      </label>

      <select
        id="product_category"
        name="product_category"
        class="mt-1 p-2 block w-full border rounded-md"
        value={value}
        onChange={handleClickCategory}
      >
        {categories.map((item) => {
          return <option value={item._id}>{item.cateName}</option>;
        })}
      </select>
    </div>
  );
};

export default ItemCategories;
