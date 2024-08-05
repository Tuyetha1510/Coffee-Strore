import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState({ cart_item: [] });
  const [products, setProduct] = useState([]);

  const { cartId } = useParams();

  const fetchCartData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/getcart/${cartId}`
      );
      setCart(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchCartData();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productPromises = cart.cart_item?.map((product) => {
          return axios.get(
            `http://localhost:3001/getproducts/${product.productId}`
          );
        });

        const responses = await Promise.all(productPromises);
        const productsData = responses.map((response) => response.data);
        setProduct(productsData);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu sản phẩm:", error);
      }
    };
    fetchProductData();
  }, [cart.cart_item]);

  const increaseQuantity = async (Id) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/cart/increaseQuantity/${cartId}/${Id}`,
        {
          productId: Id,
        }
      );
      console.log("Sản phẩm đã được thêm 1", response.data);
      setCart(...cart);
    } catch (err) {
      console.log(err);
    }
  };

  const decreaseQuantity = (Id) => {
    // Find the product in the cart
    const productIndex = cart.cart_item.findIndex(
      (item) => item.productId === Id
    );

    if (productIndex !== -1) {
      // Get the current quantity
      const currentQuantity = cart.cart_item[productIndex].quantity;

      if (currentQuantity > 1) {
        // If the quantity is greater than 1, decrease it
        axios
          .put(`http://localhost:3001/cart/decreaseQuantity/${cartId}/${Id}`, {
            productId: Id,
          })
          .then((response) => {
            const updatedCart = { ...cart };
            updatedCart.cart_item[productIndex].quantity = currentQuantity - 1;
            setCart(updatedCart);
          })
          .catch((error) => {
            console.error("Lỗi khi giảm số lượng sản phẩm ", error);
          });
      } else {
        // If the quantity is 1, remove the product from the cart
        axios
          .delete(`http://localhost:3001/deleteitem/${cartId}/${Id}`)
          .then((updatedCart) => {
            setCart(updatedCart);
          })
          .catch((error) => {
            console.error("Lỗi khi xóa sản phẩm ", error);
          });
      }
    }
  };

  const sumPrice = () => {
    let totalPrice = 0;

    cart.cart_item?.forEach((product) => {
      totalPrice += product.price * product.quantity;
    });

    return totalPrice;
  };

  const remove = async (Id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/deleteitem/${cartId}/${Id}`
      );
      setCart(response.data);
      setCart(...cart);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckout = () => {
    // Chuyển hướng đến trang thanh toán và truyền dữ liệu giỏ hàng
    history.push({
      pathname: "/checkout",
      state: { cart },
    });
  };

  return (
    <>
      {cart.cart_item?.length > 0 ? (
        <div class="relative overflow-x-auto mx-auto shadow-md sm:rounded-lg w-[80%]">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                
                <th scope="col" class="px-6 py-3 text-center">
                  Sản phẩm
                </th>
                <th scope="col" class="px-14 py-3 text-center">
                  Số lượng
                </th>
                <th scope="col" class="px-14 py-3 text-center">
                  Size
                </th>
                <th scope="col" class="px-14 py-3 text-center">
                  Topping
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                  Giá
                </th>
                <th scope="col" class="px-6 py-3 text-center"></th>
              </tr>
            </thead>
            <tbody className="text-center">
              {products?.map((product, index) => (
                <tr
                  key={index}
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  
                  <td class="px-6 w-32 py-4 font-semibold text-gray-900 dark:text-white">
                    <img src={product.imagePro} />
                    {product.namePro}
                  </td>
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center justify-center space-x-3">
                      <button
                        onClick={() => decreaseQuantity(product._id)}
                        class="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <svg
                          class="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div>
                        <input
                          type="number"
                          id={product._id}
                          class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={cart.cart_item[index]?.quantity}
                          required
                        />
                      </div>
                      <button
                        onClick={() => increaseQuantity(product._id)}
                        class="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span class="sr-only">Quantity button</span>
                        <svg
                          class="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td>
                    {cart.cart_item[index]?.size}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {cart.cart_item[index]?.topping?.map(
                      (topping, toppingIndex) => (
                        <div key={toppingIndex}>
                          {topping.nameT}
                          {toppingIndex <
                            cart.cart_item[index].topping.length - 1 && (
                            <br />
                          )}{" "}
                        </div>
                      )
                    )}
                  </td>
                  <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    ${product.price}
                  </td>
                  <td class="px-6 py-4">
                    <button
                      onClick={() => remove(product._id)}
                      class="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
              <tr class="relative bg-slate-700 text-2xl text-white">
                <td></td>
                <td></td>
                <td></td>
                <td className="text-center">Tổng tiền: </td>
                <td>{sumPrice()}</td>
                <td>
                  <Link to="/checkout">
                    <button
                      onClick={handleCheckout}
                      className="bg-blue-500 text-base p-1 rounded-2xl right-40 shadow-xl border-2 text-white hover:bg-blue-800"
                    >
                      Thanh Toán
                    </button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div class="bg-gray-100 h-screen flex items-center justify-center">
          <div class="w-[40rem] p-8 bg-gray-50 border-2 rounded-lg shadow-lg">
            <h1 class="text-3xl font-semibold mb-4 text-center">
              Giỏ hàng của bạn đang trống
            </h1>
            <p class="text-gray-600 text-center">
              Không có sản phẩm nào trong giỏ hàng của bạn. Hãy thêm sản phẩm
              vào giỏ hàng để tiếp tục mua sắm.
            </p>
            <a
              href="/productList"
              class="mt-4 inline-block ml-[13rem] px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Mua sắm ngay
            </a>
          </div>
        </div>
      )}
    </>
  );
};
export default Cart;
