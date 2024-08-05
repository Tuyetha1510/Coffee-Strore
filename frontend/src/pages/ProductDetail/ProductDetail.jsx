import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function ProductDetail() {
  const [products, setProduct] = useState({});
  const { productId } = useParams();
  const user = localStorage.getItem("user");
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedToppings, setSelectedToppings] = useState([]);



  useEffect(() => {
    axios
      .get(`http://localhost:3001/getproducts/${productId}`)
      .then((product) => {
        return setProduct({ ...product.data });
      })
      .catch((err) => console.log(err));
  }, []);
  const userId = localStorage.getItem("userId");

  const handleAddToCart = () => {
    // Gọi phương thức POST để thêm sản phẩm vào giỏ hàng
    axios
      .post("http://localhost:3001/cart/addItems", {
        productId: productId,
        quantity: 1,
        price: products.price,
        userId,
        totalPrice: products.price,
        topping:selectedToppings,
        size:selectedSize,
      })
      .then((response) => {
        console.log("Sản phẩm đã được thêm vào giỏ hàng", response.data);
        window.location.href = `/cart/${userId}`;
      })
      .catch((error) => {
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng", error);
      });
      console.log(selectedSize)
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };
  

  const handleToppingChange = (topping) => {
    
    const newSelection = [...selectedToppings];
  

    if (newSelection.includes(topping)) {
      newSelection.splice(newSelection.indexOf(topping), 1);
    } else {
      newSelection.push(topping);
    }

    setSelectedToppings(newSelection);
    
  };
  console.log(selectedToppings)

  const SIZE = ["S", "M", "L"];
  const TOPPING = [
    {
      id:1,
      nameT: "Chân châu đen",
    },
    {
      id:2,
      nameT: "Chân châu trắng",
    },
    {
      id:3,
      nameT: "Thạch đào",
    },
    {
      id:4,
      nameT: "Thạch vải",
    },
    {
      id:5,
      nameT: "Sương sáo",
    },
  ];

  return (
    <>
      {products && (
        <div>
          <div className="container mx-auto my-10">
            <div className="flex">
              <div className="w-1/2 px-44">
                <img
                  src={products.imagePro}
                  className="border-2 border-cyan-800 h-[30rem] w-[22rem]"
                />
              </div>
              <div className="w-1/2 pl-8">
                <h2 className="text-3xl font-bold text-black mb-4">
                  {products.namePro}
                </h2>
                <p className="text-cyan-800 text-lg ">SIZE</p>
                <p className="text-sm">
                  {SIZE.map((sz) => (
                    <label className="inline-block mr-3" key={sz}>
                      <input
                        type="radio"
                        name="size"
                        className="hidden"
                        value={sz}
                        checked={selectedSize === sz}
                        onChange={() => handleSizeChange(sz)}
                      />
                      <div
                        className={`border-solid border-2 rounded-md py-px px-1.5 my-2 inline-block mr-3 hover:bg-slate-500 cursor-pointer ${
                          selectedSize === sz ? "bg-slate-500" : ""
                        }`}
                      >
                        {sz}
                      </div>
                    </label>
                  ))}
                </p>
                <p className="text-cyan-800 text-lg ">TOPPING</p>
                <div className="flex flex-col">
                  {TOPPING.map((item) => {
                    return (
                      <div key={item.id}  class="inline-flex items-center">
                        <label
                          class="relative flex items-center p-3 rounded-full cursor-pointer"
                          for="checkbox"
                          data-ripple-dark="true"
                        >
                          <input
                            type="checkbox"
                            class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border-2 shadow-lg border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:bg-green-700 checked:before:bg-green-500 hover:before:opacity-10"
                            
                            //checked={selectedToppings.includes(item.id)}
                            onChange={() => handleToppingChange(item)}
                          />
                          <div class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-3.5 w-3.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              stroke="currentColor"
                              stroke-width="1"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          </div>
                        </label>
                        <label class="mt-px font-light text-gray-700 cursor-pointer select-none">
                          {item.nameT}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <p className="text-rose-700 text-2xl mt-8">
                  Giá: {products.price} VNĐ
                </p>
                <div>
                  {!user ? (
                    <h1 className="mt-10 text-lg text-cyan-900">
                      Hãy đăng nhập để mua hàng nhé !!!
                    </h1>
                  ) : (
                    <button
                      onClick={handleAddToCart}
                      className="bg-cyan-800 text-white px-4 py-2 rounded-full text-sm mt-7"
                    >
                      Thêm vào giỏ hàng
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
