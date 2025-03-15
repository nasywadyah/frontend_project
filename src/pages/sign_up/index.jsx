import React, { useEffect, useState } from "react";

function Sign_Up() {
  const [statusHide, setStatusHide] = useState(true);

  const click_pass = () => {
    setStatusHide(statusHide == true ? false : true);
  };

  useEffect(() => {
    document.title = "Bugdetin";
  }, []);
  return (
    <>
      <div className="flex w-full justify-center">
        <div className=" bg-white p-8 rounded-lg shadow-lg w-96">
          <p className="text-xl font-semibold text-center">Create an Account</p>
          <p className="text-sm text-center mb-6 text-gray-500">
            Already have an account?{" "}
            <a
              href="/sign-in"
              className="underline underline-offset-2 text-blue-600 cursor-pointer"
            >
              Log in
            </a>
          </p>

          <form className="flex flex-col">
            <label
              for="fullname"
              className="text-left block text-gray-700 font-medium text-sm"
            >
              Full Name:
            </label>
            <input
              className="border-2 border-solid rounded-lg pl-4 mb-3 h-10 text-sm "
              type="text"
              name="fullname"
              placeholder="Enter Your Full Name"
              required
            />

            <label
              for="email"
              className="text-left block text-gray-700 font-medium text-sm"
            >
              Email:
            </label>
            <input
              className="border-2 border-solid rounded-lg pl-4 mb-3 h-10 text-sm "
              type="email"
              name="email"
              placeholder="Enter Your Email"
              required
            />

            <div className="flex justify-between">
              <label
                for="password"
                className="text-left block text-gray-700 font-medium text-sm"
              >
                Password:
              </label>
              <div className="text-xs opacity-60" onClick={click_pass}>
                {statusHide ? (
                  <div>
                    <i className="fa-solid fa-eye text-xs"></i> Unhide
                  </div>
                ) : (
                  <div>
                    <i className="fa-solid fa-eye-slash text-xs"></i> Hide
                  </div>
                )}
              </div>
            </div>
            <input
              className="border-2 border-solid rounded-lg pl-4 h-10 text-sm "
              type={statusHide ? "password" : "text"}
              name="password"
              id="password"
              placeholder="Enter Your Password"
              required
            />

            <p className="text-left mb-3 text-xs text-[#666666]">
              *Use 8 or more characters with a mix of letters & numbers
            </p>

            <div className="flex justify-between">
              <label
                for="confirm_password"
                className="text-left block text-gray-700 font-medium text-sm"
              >
                Confirm Password:
              </label>
              <div className="text-xs opacity-60" onClick={click_pass}>
                {statusHide ? (
                  <div>
                    <i className="fa-solid fa-eye text-xs"></i> Unhide
                  </div>
                ) : (
                  <div>
                    <i className="fa-solid fa-eye-slash text-xs"></i> Hide
                  </div>
                )}
              </div>
            </div>
            <input
              className="border-2 border-solid rounded-lg pl-4 mb-3 h-10 text-sm "
              type="password"
              name="confirm_password"
              id="confirm_password"
              placeholder="Enter Your Confirm Password"
              required
            />

            <button className="bg-blue-500 hover:bg-blue-600 rounded-lg mt-7 h-10 text-[#FFFF] font-semibold">
              Create an Account
            </button>
          </form>

          <div className="flex items-center text-center my-6 ">
            <hr className="grow border-solid border-1" />
            <span>OR</span>
            <hr className="grow border-solid border-1" />
          </div>

          <div className="flex rounded-lg justify-center">
            <button className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-full shadow-sm hover:bg-gray-100">
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google Logo"
                className="w-5 h-5"
              />
              <span>Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sign_Up;
