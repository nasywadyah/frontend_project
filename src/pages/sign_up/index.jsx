import React, { useEffect, useState } from "react";
import axios from "axios";

function Sign_Up() {
  const [statusHide, setStatusHide] = useState(true);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const click_pass = () => {
    setStatusHide(!statusHide);
  };

  useEffect(() => {
    document.title = "BudgetIn";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setIsError(true);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        {
          fullname,
          email,
          password,
        }
      );

      setMessage(response.data.message);
      setIsError(false);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
      setIsError(true);
    }
  };

  return (
    <>
      <div className="flex w-full justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
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

          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label className="text-left block text-gray-700 font-medium text-sm">
              Full Name:
            </label>
            <input
              className="border-2 border-solid rounded-lg pl-4 mb-3 h-10 text-sm"
              type="text"
              name="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Enter Your Full Name"
              required
            />

            <label className="text-left block text-gray-700 font-medium text-sm">
              Email:
            </label>
            <input
              className="border-2 border-solid rounded-lg pl-4 mb-3 h-10 text-sm"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              required
            />

            <div className="flex justify-between">
              <label className="text-left block text-gray-700 font-medium text-sm">
                Password:
              </label>
              <div
                className="text-xs opacity-60 cursor-pointer"
                onClick={click_pass}
              >
                {statusHide ? <span>👁 Unhide</span> : <span>🙈 Hide</span>}
              </div>
            </div>
            <input
              className="border-2 border-solid rounded-lg pl-4 h-10 text-sm mb-3"
              type={statusHide ? "password" : "text"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              required
            />

            <label className="text-left block text-gray-700 font-medium text-sm">
              Confirm Password:
            </label>
            <input
              className="border-2 border-solid rounded-lg pl-4 mb-3 h-10 text-sm"
              type={statusHide ? "password" : "text"}
              name="confirm_password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter Your Confirm Password"
              required
            />

            {message && (
              <p
                className={`text-sm text-center ${
                  isError ? "text-red-600" : "text-green-600"
                }`}
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 rounded-lg mt-7 h-10 text-white font-semibold"
            >
              Create an Account
            </button>

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
          </form>
        </div>
      </div>
    </>
  );
}

export default Sign_Up;
