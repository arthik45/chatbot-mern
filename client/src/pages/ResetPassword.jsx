import React, { useState } from "react";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Replace with your backend API call
      // await axios.post(`${backendurl}/auth/reset-password`, { email });
      toast.success("Password reset link sent to your email!");
      setEmail("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-400 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
          Reset Password
        </h2>

        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your email to receive a password reset link.
        </p>

        <form onSubmit={handleReset} className="space-y-4">
          <div className="relative w-full">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-4 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Remembered your password?{" "}
          <button
            className="text-green-700 font-medium hover:underline"
            onClick={() => window.history.back()}
          >
            Go back
          </button>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
