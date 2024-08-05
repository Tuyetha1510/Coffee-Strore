import React, { useState, useEffect } from "react";
import NavbarAdmin from "../../component/NavbarAdmin";
import axios from "axios";

function QLDH() {
  const [orders, setOrder] = useState([]);
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    const fetchProductDetails = async (productId) => {
      try {
        const response = await axios.get(
          `http://localhost:3001/getproducts/${productId}`
        );
        setProductDetails((prevDetails) => ({
          ...prevDetails,
          [productId]: response.data,
        }));
      } catch (error) {
        console.error("Lỗi lấy thông tin sản phẩm:", error);
      }
    };

    if (orders) {
      orders.forEach((itemOrder) => {
        if (itemOrder.cart_item) {
          itemOrder.cart_item.forEach((cartItem) => {
            fetchProductDetails(cartItem.productId);
          });
        }
      });
    }
  }, [orders]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getorder")
      .then((order) => setOrder(order.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex">
      <div>
        <NavbarAdmin />
      </div>
      <div className="w-full mr-3">
        {orders.map((itemOrder) => (
          <div key={itemOrder._id} className="rounded-md border-2 flex">
            <div className="w-2/4">
              <p className="mx-10 font-bold">MÃ ĐƠN HÀNG : {itemOrder._id}</p>
              <div className="my-3 mx-16">
                <p>Thông tin liên hệ : {itemOrder.sdt}</p>
                <p>Địa chỉ : {itemOrder.address}</p>
                <p>Mã khách hàng: {itemOrder.userId}</p>
              </div>
            </div>
            <div className="w-1/4">
              {itemOrder.cart_item &&
                itemOrder.cart_item.map((cartItem) => (
                  <div key={cartItem.productId} className="my-3 mx-16">
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
                          <p key={toppingItem.id}>{toppingItem.nameT}</p>
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
      </div>
    </div>
  );
}
export default QLDH;
