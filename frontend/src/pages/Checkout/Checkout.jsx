import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Checkout() {
  const [cart, setCart] = useState({ cart_item: [] });
  const [products, setProduct] = useState([]);
  const userId = localStorage.getItem("userId");
  const user = localStorage.getItem("user");
  const [name, setName] = useState();
  const [sdt, setSdt] = useState();
  const navi = useNavigate();

  const [address, setAdress] = useState();

  const fetchCartData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/getcart/${userId}`
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

        // Xử lý lỗi theo ý của bạn, ví dụ: hiển thị thông báo cho người dùng
      }
    };

    // Gọi hàm fetchProductData
    fetchProductData();
  }, [cart.cart_item]);

  const sumPrice = () => {
    let totalPrice = 0;

    cart.cart_item?.forEach((product) => {
      totalPrice += product.price * product.quantity;
    });

    return totalPrice;
  };
  

  const Submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/oder", {
        status: "Hoàn thành",
        name,
        sdt,
        address,
        cart_item: cart.cart_item,
        totalPrice: sumPrice(),
        userId,
      })

      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
      axios
      .delete(`http://localhost:3001/deletecart/${userId}`)
      .then((updatedCart) => {
        setCart(...cart);
      })
      .catch((error) => console.log("Sản phẩm chưa được xóa ", error));
      alert("Thanh toán thành công ");
      navi("/productlist")
  
  };
  return (
    <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
      <div class="px-4 pt-8">
        <p class="text-xl font-medium">Sản phẩm thanh toán</p>
        {products?.map((product, index) => (
          <div
            key={index}
            class="mt-8 space-y-3 rounded-lg border bg-zinc-200 px-2 py-4 sm:px-6"
          >
            <div class="flex flex-col rounded-lg bg-zinc-200 sm:flex-row">
              <img
                class="m-2 h-24 w-28 rounded-md border object-cover object-center"
                src={product.imagePro}
              />
              <div class="flex w-full flex-col px-4 py-4">
                <span class="font-semibold">{product.namePro}</span>
                <span class="float-right text-zinc-500">
                  Số lương: x{cart.cart_item[index]?.quantity}
                </span>
                <p class="text-lg">{cart.cart_item[index]?.size}</p>
              </div>
              <div className="text-2xl py-10">{product.price}</div>
            </div>
          </div>
        ))}
      </div>

      <div class="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
        <p class="text-xl font-medium">Thông tin thanh toán</p>
        <p class="text-gray-400">Vui lòng hoàn thành quá trình thanh toán.</p>
        <div class="">
          <label for="Number" class="mt-4 mb-2 block text-sm font-medium">
            Số điện thoại
          </label>
          <div class="relative">
            <input
              onChange={(e) => setSdt(e.target.value)}
              type="text"
              class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            />
            <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </div>
          </div>
          <label for="card-holder" class="mt-4 mb-2 block text-sm font-medium">
            Tên
          </label>
          <div class="relative">
            <input
              // onChange={(e) => setName(e.target.value)}
              type="text"
              id="card-holder"
              name="card-holder"
              class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Điền họ tên của bạn"
              value={user}
            />
            <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                />
              </svg>
            </div>
          </div>

          <label
            for="billing-address"
            class="mt-4 mb-2 block text-sm font-medium"
          >
            Địa chỉ
          </label>
          <div class="flex flex-col sm:flex-row">
            <div class="relative w-full">
              <input
                onChange={(e) => setAdress(e.target.value)}
                type="text"
                id="billing-address"
                name="billing-address"
                class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Địa chỉ"
              />
              <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <img
                  class="h-4 w-4 object-contain"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_North_Vietnam_%281945%E2%80%931955%29.svg/230px-Flag_of_North_Vietnam_%281945%E2%80%931955%29.svg.png"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div class="mt-6 flex items-center justify-between">
            <p class="text-sm font-medium text-gray-900">Tổng hóa đơn</p>
            <p class="text-2xl font-semibold text-gray-900">{sumPrice()}</p>
          </div>
          <div>
            <Link to="/checkout">
              <button
                onClick={Submit}
                className="bg-blue-500 text-base p-1 rounded-2xl right-40 shadow-xl border-2 text-white hover:bg-blue-800"
              >
                Thanh Toán
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
