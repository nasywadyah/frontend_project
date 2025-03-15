import { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Handle perubahan input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login dengan:", formData);
  };

  // Handle Login dengan Google
  const handleGoogleLogin = () => {
    console.log("Login dengan Google...");
  };

  return (
    <div className="flex justify-center w-full">
      <div className=" bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-center">Welcome To Finovate</h2>
        <h4 className="text-gray-500 text-center mb-6 text-sm mt-2 text-ms">Welcome back! Please enter your details</h4>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-3">
            <label className=" text-left block text-gray-700 text-sm font-medium mb-2">Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Masukkan email" className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" required />
          </div>

          {/* Password Input */}
          <div className="mb-3 relative">
            <label className=" text-left block text-gray-700 font-medium text-sm mb-2">Password:</label>
            <input type={passwordVisible ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Masukkan password" className="w-full mt-1 px-3 py-2 border rounded-lg text-ms" required />
            <button type="button" className="absolute right-3 top-9 text-gray-600" onClick={() => setPasswordVisible(!passwordVisible)} aria-label={passwordVisible ? "Sembunyikan password" : "Tampilkan password"}>
              👁️
            </button>
          </div>

          {/* Lupa Password */}
          <div className="text-right text-blue-600 text-sm cursor-pointer mb-3">
            <Link to="/request-reset">Forgot password?</Link>
          </div>
          {/* Tombol Login */}
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            Sign in
          </button>
        </form>

        {/* Atau */}
        <div className="flex items-center text-center my-6 ">
          <hr className="grow border-solid border-1" />
          <span>OR</span>
          <hr className="grow border-solid border-1" />
        </div>

        {/* Tombol Login dengan Google */}
        <div className="flex rounded-lg justify-center">
          <button onClick={handleGoogleLogin} className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-full shadow-sm hover:bg-gray-100">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo" className="w-5 h-5 mr-2" />
            Continue with Google
          </button>
        </div>
        {/* Link ke Register */}
        <div className="text-center mt-3 text-gray-600 text-sm">
          Dont have an account?{" "}
          <span className="text-blue-600 cursor-pointer">
            {" "}
            <a href="/sign-up">Sign up now</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
