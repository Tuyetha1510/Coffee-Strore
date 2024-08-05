import { Link } from "react-router-dom";
import SignupForm from "./Form/SignupForm";

export default function Signup() {
  return (
    <>
      <div className="flex">
        <img
          className="h-screen w-[70%] ml-20 object-center pb-10"
          loading="lazy"
          src="https://i.pinimg.com/236x/ab/98/9e/ab989e3d7e6d39a58b3d3e262a9c924b.jpg"
        />
        
        <div className="w-full flex items-center">
          
          <div className="lg:p-8 m-auto">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Tạo tài khoản
                </h1>
                <p className="text-sm text-slate-600">
                  Nhập vào thông tin của bạn để tạo tài khoản
                </p>
              </div>
            </div>
            <div className="grid gap-6 mt-[9px]">
              <SignupForm />
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
