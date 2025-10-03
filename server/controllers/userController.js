import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  try {
    // Accept email from query OR body (fallback for flexibility)
    const email = req.query.email || req.body.email;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    // Fetch user safely, exclude sensitive fields
    const user = await userModel.findOne({ email }).select(
      "-password -__v -verifyOtp -verifyOtpExpiry -resetOtp -resetOtpExpiry"
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


