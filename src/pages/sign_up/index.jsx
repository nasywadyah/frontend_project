import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/auth";

function Sign_Up() {
  const [statusHide, setStatusHide] = useState(true);
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const click_pass = () => {
    setStatusHide(!statusHide);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (password !== confirmPassword) {
    //   setMessage("Passwords do not match");
    //   setIsError(true);
    //   return;
    // }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const data = await register(name, email, phone, password);
      navigate("/dashboard"); // Redirect ke dashboard
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.title = "BudgetIn";
  }, []);

  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:8000/auth-google-redirect";
  };

  return (
    <>
      <div className="flex w-full justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <p className="text-xl font-semibold text-center">Create an Account</p>
          <p className="text-sm text-center mb-6 text-gray-500">
            Already have an account?{" "}
            <Link to="/sign-in" className="underline underline-offset-2">
              <a
                href=""
                className="underline underline-offset-2 text-blue-600 cursor-pointer"
              >
                Log in
              </a>
            </Link>
          </p>

          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label className="text-left block text-gray-700 font-medium text-sm">
              Full Name:
            </label>
            <input
              className="border-2 border-solid rounded-lg pl-4 mb-3 h-10 text-sm"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setname(e.target.value)}
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

            <label className="text-left block text-gray-700 font-medium text-sm">
              Phone:
            </label>
            <input
              className="border-2 border-solid rounded-lg pl-4 mb-3 h-10 text-sm"
              type="number"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Your Phone"
              required
            />

            <div className="flex justify-between">
              <label className="text-left block text-gray-700 font-medium text-sm">
                Password:
              </label>
              <div className="text-xs opacity-60" onClick={click_pass}>
                {statusHide ? (
                  <div
                    className="cursor-pointer"
                    onClick={() => setpasswordVisible(true)}
                  >
                    <i className="fa-solid fa-eye text-xs"></i> Unhide
                  </div>
                ) : (
                  <div
                    className="cursor-pointer"
                    onClick={() => setpasswordVisible(false)}
                  >
                    <i className="fa-solid fa-eye-slash text-xs"></i> Hide
                  </div>
                )}
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

            {errorMessage && (
              <p className="text-red-500 mt-2 mb-2">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              {isLoading ? "Loading..." : "Create an Account"}
            </button>

            <div className="flex items-center text-center my-6 ">
              <hr className="grow border-solid border-1" />
              <span>OR</span>
              <hr className="grow border-solid border-1" />
            </div>

            <div className="flex rounded-lg justify-center">
              <button
                onClick={handleGoogleSignIn}
                className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-full shadow-sm hover:bg-gray-100"
              >
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
