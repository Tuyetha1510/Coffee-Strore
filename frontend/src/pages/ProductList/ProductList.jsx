import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slide from "../../../component/Slide";
import NavbarCol from "../../../component/NavbarCol";

function ProductList() {
  const [products, setProduct] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  
  useEffect(() => {
    axios
      .get("http://localhost:3001/getproducts")
      .then((product) => setProduct(product.data))
      .catch((err) => console.log(err));
  }, []);
  
  const filteredProducts = products.filter((item) => {
    return item.namePro.toLowerCase().includes(searchKeyword.toLowerCase()) && item.status == true;
  });

  return (
    <>
      <Slide />

      <div class="flex">
        <div class="w-1/4">
          <NavbarCol />
        </div>
        <div className="w-3/4">
          <input
            type="search"
            onChange={(e) => setSearchKeyword(e.target.value)}
            value={searchKeyword}
            class="block w-[35%] p-3 text-sm border border-gray-300 rounded-3xl bg-gray-200  focus:border-blue-500 dark:placeholder-gray-500 dark:text-black dark:focus:ring-blue-500 ml-[65%] my-3 shadow-lg"
            placeholder="Tìm kiếm ..."
            required
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 shadow-xl bg-blue-50 product-list">
            {filteredProducts.map((item) => {
              return (
                <div className="my-9 py-6 mx-12">
                  <Link to={`/productdetail/${item._id}`} key={item._id}>
                    <div class="w-[14rem] h-fit shadow-md rounded-md hover:bg-blue-200 pt-2">
                      <img
                        className="border-2 border-cyan-800 w-[13rem] h-[18rem] mx-2 rounded-lg"
                        src={item.imagePro}
                      />
                      <h2 className="text-center text-cyan-800 uppercase font-bold">
                        {" "}
                        {item.namePro}{" "}
                      </h2>
                      <h1 className="text-center text-rose-600 uppercase font-bold pb-1">
                        Giá: {item.price} VNĐ
                      </h1>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductList;
