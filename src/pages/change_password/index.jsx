import React, { useEffect, useState } from "react";

function ChangePassword() {
  const [statusHide, setStatusHide] = useState(true);

  const click_pass = () => {
    setStatusHide(statusHide == true ? false : true);
  };

  useEffect(() => {
    document.title = "Change Password";
  }, []);
  return (
    <>
      <div className="flex w-full justify-center">
        <div className=" bg-white p-8 rounded-lg shadow-lg w-96">
          <p className="text-xl font-semibold text-center">
            Set a New Password
          </p>
          <p className="text-sm text-center mb-8 text-gray-500">
            Create a new password. Ensure it differs from previous ones for
            security
          </p>

          <form className="flex flex-col">
            <div className="flex justify-between">
              <label
                for="password"
                className="text-left block text-gray-700 font-medium text-sm"
              >
                New Password:
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
              placeholder="Enter Your New Password"
              required
            />

            <p className="text-left mb-3 text-xs text-[#666666]">
              *Use 8 or more characters with a mix of letters, numbers & symbols
            </p>
            <div className="flex justify-between">
              <label
                for="confirm_password"
                className="text-left block text-gray-700 font-medium text-sm"
              >
                Confirm New Password:
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
              placeholder="Enter Your Confirm New Password"
              required
            />

            <button className="bg-blue-500 hover:bg-blue-600 rounded-lg mt-7 h-10 text-[#FFFF] font-semibold">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
