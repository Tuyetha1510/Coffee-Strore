import React from "react";
import { Link } from "react-router-dom";
import SigninForm from "./Form/SigninForm";

function Signin  () {
  return (
    <>
      <div className="h-screen flex">
        <div className="w-[50%] grid gap-6 mt-[9px]  items-center">
          <div className="space-y-8 m-auto ">
            <div className="mb-9 text-center">
              
              <h2 className="text-[20px] mx-[6rem] font-bold mb-2">
                Đăng nhập bằng tài khoản
              </h2>
              
            </div>
            <SigninForm />
            <p>
                Bạn chưa đăng ký?{" "}
                <span className="text-blue-600 font-semibold ">
                  <Link to="/signup">Bấm vào đây</Link>
                </span>
              </p>
          </div>
        </div>
        <div className="w-[50%] ">
          <img
            className="h-full object-cover pb-10"
            src="https://i.pinimg.com/236x/a5/32/4f/a5324fab29fe7ee9da20fc64252076b8.jpg"
          />
        </div>
      </div>
    </>
  );
};

export default Signin;
