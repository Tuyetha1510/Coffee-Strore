import React, { useState, useEffect } from "react";
import axios from "axios";

export const OrderDetail = () => {
  const userId = localStorage.getItem("userId");
  const [orderDetails, setOrderDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    const fetchProductDetails = async (productId) => {
      try {
        const response = await axios.get(
          `http://localhost:3001/getproducts/${productId}`
        );
        setProductDetails((prevDetails) => ({
          ...prevDetails,
          [productId]: response.data, // Save product details in state using productId as key
        }));
      } catch (error) {
        console.error("Lỗi lấy thông tin sản phẩm:", error);
      }
    };

    // Check if orderDetails is defined before processing it
    if (orderDetails) {
      orderDetails.forEach((itemOrder) => {
        if (itemOrder.cart_item) {
          itemOrder.cart_item.forEach((cartItem) => {
            fetchProductDetails(cartItem.productId);
          });
        }
      });
    }
  }, [orderDetails]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/orderDetails/${userId}`
        );
        setOrderDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error);
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrderDetails();
    }
  }, [userId]);

  return (
    <>
      {loading && (
        <h1 class="text-3xl font-semibold mb-4 text-center ">LOADING...</h1>
      )}
      {!loading && orderDetails.length === 0 && (
        <p>
          <div class="bg-gray-100 h-screen flex items-center justify-center">
            <div class="w-[40rem] p-8 bg-gray-50 border-2 rounded-lg shadow-lg">
              <h1 class="text-3xl font-semibold mb- 4 text-center">
                LỊCH SỬ ĐƠN HÀNG TRỐNG
              </h1>
              <p class="text-gray-600 text-center">
                Không có đơn nào trong lịch sử mua hàng
              </p>
              <a
                href="/productList"
                class="mt-4 inline-block ml-[13rem] px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Mua sắm ngay
              </a>
            </div>
          </div>
        </p>
      )}
      {!loading &&
        orderDetails.map((itemOrder) => (
          <div
            key={itemOrder._id}
            className="rounded-md border-2 mx-[15rem] flex"
          >
            <div className="w-2/4">
              <p className="mx-10 font-bold">MÃ ĐƠN HÀNG : {itemOrder._id}</p>
              <div className="my-3 mx-16">
                <p>Thông tin liên hệ : {itemOrder.sdt}</p>
                <p>Địa chỉ : {itemOrder.address}</p>
              </div>
            </div>
            <div className="w-1/4">
              {itemOrder.cart_item &&
                itemOrder.cart_item.map((cartItem) => (
                  <div key={cartItem._id} className="my-3 mx-16">
                    {productDetails[cartItem.productId] && (
                      <>
                        <img
                          src={productDetails[cartItem.productId].imagePro}
                          alt={productDetails[cartItem.productId].imagePro}
                          style={{ width: "50px", height: "50px" }}
                        />
                        <p>{productDetails[cartItem.productId].namePro}</p>
                      </>
                    )}
                    <p>
                      <p>- Topping:</p>
                      {cartItem.topping &&
                        cartItem.topping.map((toppingItem) => (
                          <p key={toppingItem.id}>
                            {toppingItem.nameT}
                          </p>
                        ))}
                    </p>
                    <p>- Số lượng: {cartItem.quantity}</p>
                    <p>- Size: {cartItem.size}</p>
                  </div>
                ))}
            </div>
            <div className="w-1/4 py-4 font-bold text-center">
              <p className="text-2xl text-green-600">{itemOrder.status}</p>
              Tổng đơn: {itemOrder.totalPrice}
            </div>
          </div>
        ))}
    </>
  );
};
