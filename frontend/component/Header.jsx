import { Popover } from "@headlessui/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
function Header() {
  const user = localStorage.getItem("user");
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState({ cart_item: [] });
  const { cartId } = useParams();
  
  useEffect(() => {
    axios
      .get(`http://localhost:3001/getcart/${userId}`)
      .then((cart) => setCart(cart.data))
      .catch((err) => console.log(err));
  }, [cartId]);

  const totalQuantity = user
    ? cart.cart_item.reduce((total, item) => total + item.quantity, 0)
    : 0;

  return (
    <header className="bg-slate-800 ">
      <nav
        className=" mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className=" flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <h2 className="text-white text-2xl">DHDRINKS</h2>
          </a>
        </div>

        {!user ? (
          <Link to="/signin">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent bg-slate-50 hover:bg-gray-600 h-9 px-4 py-2 absolute md:right-8 md:top-6">
              Đăng nhập
            </button>
          </Link>
        ) : (
          <Link to="/signin">
            <button
              onClick={() => {
                localStorage.clear("user");
                return (window.location.href = "/");
              }}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent bg-slate-50 hover:bg-gray-600 h-9 px-4 py-2 absolute md:right-8 md:top-6"
            >
              Đăng xuất
            </button>
          </Link>
        )}
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Link
            to="/"
            className="text-lg font-semibold leading-6 text-white hover:text-blue-500"
          >
            Trang chủ
          </Link>
          <Link
            to="/productlist"
            className="text-lg font-semibold leading-6 text-white hover:text-blue-500"
          >
            Sản phẩm
          </Link>
          <Link 
            to={`/orderdetail/${userId}`}
            className="text-lg font-semibold leading-6 text-white hover:text-blue-500"
          >
            Đơn hàng
          </Link>
        </Popover.Group>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end mr-12">
          <Link to={`/cart/${userId}`} className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>

            <div class="absolute top-0 right-0 -mt-[4px] -mr-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
              <span>{totalQuantity}</span>
            </div>
          </Link>
          {!user ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 ml-3 text-green-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          ) : (
            <div className="text-purple-500 text-xl flex ml-5">
              <h1>{user.toString().toLocaleUpperCase()}</h1>
              {user.toString().toLocaleUpperCase() === "ADMIN" && (
                <Link to="/qlproducts">
                  <button className="bg-white text-black hover:bg-gray-600 h-9 px-2 py-2 md:right-8 md:top-6 rounded-md ml-3 text-sm">
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
                        d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                      />
                    </svg>
                  </button>
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
export default Header;
