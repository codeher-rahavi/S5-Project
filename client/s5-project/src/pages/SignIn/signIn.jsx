import React, { useState } from "react";
import signin from "../../images/signin.jpg";
import { useNavigate } from "react-router-dom";
import PassWord from "../../components/input/password";
import EmailInput from "../../components/input/email";
const SignIn = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [passWord, setPassWord] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const cleanEmail = email.trim().toLowerCase();

            // 1. Send credentials to your new backend server running on Port 5000
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: cleanEmail,
                    password: passWord // Matches the lower-case 'password' expected by your new schema
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // 2. Extract the fresh JWT token and user info sent by your new backend
                const token = data.token;
                const serverRole = data.user?.role ? data.user.role.toUpperCase() : 'OPERATOR';

                const fullyAuthorizedUser = {
                    ...data.user,
                    email: cleanEmail,
                    role: serverRole
                };

                // 3. CRITICAL: Save the unique JWT token to sessionStorage 
                // This overwrites any lingering ghost tokens from your previous project!
                sessionStorage.setItem("token", token);
                sessionStorage.setItem("user", JSON.stringify(fullyAuthorizedUser));

                alert("Login Successful!");

                // 4. Redirect safely to your main landing page
                if (serverRole === "ADMIN") {
                    navigate("/Admin/dashboarb");
                } else {
                    navigate("/Home"); // Your main IoT Fleet overview dashboard page
                }

            } else {
                alert(data.message || "Invalid Email or Password");
            }
        } catch (err) {
            console.error("Login Navigation Error:", err);
            alert("Server Error. Please verify your connection status and backend execution logs.");
        }
    };
    const handleForgotPasswordClick = async () => {
        const emailInput = prompt("Please enter your registered email:");
        if (!emailInput) return;

        try {
            const response = await fetch("http://localhost:5000/api/auth/forgotPassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: emailInput.trim().toLowerCase() })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Success! If that email exists, a reset link has been sent.");
            } else {
                alert(data.message || "Something went wrong.");
            }
        } catch (err) {
            alert("Server connection failed.");
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[600px_1fr] min-h-screen">
            <div className="relative min-h-screen">
                <form onSubmit={handleLogin}>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 w-[400px]">
                        <h3 className="text-3xl mb-6 font-semibold">Log In</h3>
                        <EmailInput
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        <PassWord
                            value={passWord}
                            onChange={(e) => setPassWord(e.target.value)}
                        />
                        <button
                    
                            type="submit"
                            className="inline-block rounded-sm bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl text-center cursor-pointer"
                        >
                            Log In
                        </button>
                        <p onClick={handleForgotPasswordClick} className="text-blue-700 flex justify-end cursor-pointer text-sm font-medium hover:underline">Forgot password?</p>

                        <div className="flex items-center gap-4">
                            <div className="h-px bg-gray-400 flex-1"></div>
                            <span className="text-gray-500 text-sm">or</span>
                            <div className="h-px bg-gray-400 flex-1"></div>
                        </div>

                        <div className="flex justify-between mt-4 gap-3">
                            <button type="button" className="border h-[50px] w-[200px] font-medium rounded-md border-gray-400 cursor-pointer text-[18px] hover:shadow-xl hover:scale-95 mx-auto flex items-center justify-center bg-white">
                                <img src="/google.svg" alt="google-logo" className="w-7 inline mr-2" />
                                Google
                            </button>
                        </div>

                        <p className="mt-4 text-sm text-gray-600 text-center">
                            Don't have an account?{" "}
                            <span className="text-blue-700 cursor-pointer underline font-semibold" onClick={() => navigate("/SignUp")}>
                                Sign Up
                            </span>
                        </p>
                    </div>
                </form>
            </div>

            <div className="relative min-h-screen hidden lg:block">
                <div className="absolute top-[100px] text-2xl w-[610px] ml-24 z-10 text-slate-800">
                    <p className="text-3xl leading-12 font-light">
                        The Future belongs to those who <span className="text-indigo-600 font-semibold">believe</span> in the <span className="text-indigo-600 font-semibold">beauty of their dreams.</span>
                    </p>
                    <p className="text-xl ml-50 mt-4 font-semibold text-slate-500"> - Eleanor Roosevelt</p>
                </div>
                <img src={signin} alt="signin image visual asset" className="w-full h-full object-cover select-none" />
            </div>
        </div>
    );
};

export default SignIn;