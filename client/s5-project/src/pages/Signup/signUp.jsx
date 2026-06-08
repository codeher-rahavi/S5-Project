import React, { Fragment, useState, useEffect } from "react";
import picup from "../../images/picup.png";
import { useNavigate } from "react-router-dom";
import PassWord from "../../components/input/password";
import RepeatPassWord from "../../components/input/repeatPassword";
import EmailInput from "../../components/input/email";
import { useDebounce } from "../../hooks/useDebounce"; 

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState(""); 
    const [passWord, setPassWord] = useState("");
    const [strength, setStrength] = useState({ score: 0, message: "", color: "gray" });

    const evaluatePassword = (password) => {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        switch (score) {
            case 0:
            case 1: return { score, message: "Weak (Add numbers/symbols)", color: "red" };
            case 2: return { score, message: "Medium (Add uppercase/symbols)", color: "orange" };
            case 3: return { score, message: "Strong!", color: "green" };
            case 4: return { score, message: "Very Strong!", color: "darkgreen" };
            default: return { score: 0, message: "", color: "gray" };
        }
    };

    const handlePasswordChange = (e) => {
        const val = e.target.value;
        setPassWord(val);
        setStrength(evaluatePassword(val));
    };

    const debouncedEmail = useDebounce(email, 500);

    // 📡 GATE 1: Real-Time Availability Check Sanitization
    useEffect(() => {
        const validateEmail = async () => {
            // 💡 UPDATED: Regex now strictly enforces your institutional organizational domain requirement
            const orgDomainRegex = /^[a-z0-9._%+-]+@bitsathy\.ac\.in$/;

            if (!debouncedEmail) {
                setStatus("");
                return;
            }

            // 🧼 SANITIZE local check string to lowercase instantly
            const sanitizedCheckEmail = debouncedEmail.trim().toLowerCase();

            if (!orgDomainRegex.test(sanitizedCheckEmail)) {
                setStatus("❌ Must be a valid @bitsathy.ac.in institutional email.");
                return;
            }

            setStatus("Checking availability...");

            try {
                const response = await fetch("http://localhost:8000/api/check-email", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    // 💡 FIXED: Dispatches perfectly formatted lowercase email down the wire
                    body: JSON.stringify({ email: sanitizedCheckEmail }), 
                });

                const data = await response.json();

                if (response.status === 200) {
                    setStatus("✅ Email is available!");
                } else if (response.status === 409) {
                    setStatus("❌ Email already taken.");
                } else {
                    setStatus("⚠️ " + data.message);
                }
            } catch (err) {
                setStatus("Server Error (Is backend running?)");
            }
        };

        validateEmail();
    }, [debouncedEmail]);

    // 📥 GATE 2: Final Submission Database Cataloging Sanitization
    const handleSignUp = async (e) => {
        e.preventDefault(); 

        if (status !== "✅ Email is available!") {
            alert("Please use a unique and valid institutional email.");
            return;
        }

        // 🧼 SANITIZE submission data payload string completely
        const finalCleanEmail = email.trim().toLowerCase();

        try {
            const response = await fetch("http://localhost:8000/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: finalCleanEmail, // 💡 FIXED: Dispatches clean lowercase string to MongoDB
                    password: passWord
                }),
            });

            const data = await response.json();

            if (response.status === 201) {
                alert("Signup Successful!");
                navigate("/SignIn"); 
            } else {
                alert(data.message || "Signup failed");
            }
        } catch (err) {
            console.error("Signup Error:", err);
            alert("Connection failed. Is the server running?");
        }
    };

    return (
        <Fragment>
            <div className="grid grid-cols-1 lg:grid-cols-[900px_1fr] min-h-screen">
                <div className="relative min-h-screen">
                    <div className="z-10 absolute top-[50px] left-[80px] w-[500px] p-5">
                        <p className="text-2xl lg:text-3xl w-[300px] lg:w-[550px] leading-13">
                            The only way <span className="text-blue-500">to do great work</span> is to <span className="text-blue-500">love what you do</span>
                        </p>
                        <p className="ml-60 text-xl font-semibold">- Steve Jobs </p>
                    </div>
                    <img src={picup} className="w-full h-full z-10" alt="img" />
                </div>

                <div className="relative min-h-screen">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        {/* 💡 FIXED: Form tracking listener fires cleanly */}
                        <form onSubmit={handleSignUp}>
                            <div className="flex flex-col gap-3 h-[540px] w-[500px] p-10">
                                <h2 className="text-3xl font-semibold mb-5">Sign Up</h2>

                                <div className="flex flex-col gap-1">
                                    <EmailInput
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <span className={`text-[12px] font-medium ml-1 ${status.includes('✅') ? 'text-green-600' : 'text-red-500'}`}>
                                        {status}
                                    </span>
                                </div>

                                <PassWord value={passWord} onChange={handlePasswordChange} />
                                {passWord && (
                                    <div className="mt-1">
                                        <p className="text-[10px] mt-1" style={{ color: strength.color }}>
                                            {strength.message}
                                        </p>
                                    </div>
                                )}
                                <RepeatPassWord />

                                <button
                                    type="submit"
                                    className="inline-block rounded-sm bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl text-center disabled:bg-gray-400 cursor-pointer mt-2"
                                    disabled={status !== "✅ Email is available!"}
                                >
                                    SignUp
                                </button>

                                <div className="flex gap-4 items-center mt-2">
                                    <div className="h-px bg-gray-400 flex-1"></div>
                                    <span>or</span>
                                    <div className="h-px bg-gray-400 flex-1"></div>
                                </div>

                                <div className="flex justify-between mt-1">
                                    <button type="button" className="border h-[50px] w-[200px] font-medium rounded-md border-gray-400 cursor-pointer text-[18px] hover:shadow-xl hover:scale-95 mx-auto">
                                        <img src="/google.svg" alt="google-logo" className="w-7 inline mr-2" />
                                        Google
                                    </button>
                                </div>

                                <p className="text-gray-400 mt-5">
                                    Already have an account? <span className="text-blue-700 cursor-pointer underline" onClick={() => navigate("/SignIn")}>Log In</span>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default SignUp;