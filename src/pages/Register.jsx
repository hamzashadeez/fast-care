import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LoadingComponent from "../components/LoadingComponent";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(false);
  const navigate = useNavigate();


  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        const userType = type ? "doctor" : "parent";
        await setDoc(doc(db, "users", email), {
          userType,
          fullName,
          email,
          password,
        });

        console.log("Done");
        setLoading(false);
        navigate("/dashboard");

      })
      .catch((error) => {
        alert(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen ">
      {loading && <LoadingComponent />}
      <div className="w-full md:block md:w-1/2 h-screen p-8 md:p-24">
        <h1 className="text-green-600 md:mt-12 md:mt-0 font-semibold text-3xl md:text-4xl">
          Fast<span className="text-gray-600">Care</span>
        </h1>
        <p className="text-xl">Register New Account With Fast Care</p>
        <form
          onSubmit={(e) => onSubmit(e)}
          className="flex flex-col mt-8 gap-3"
        >
          <div className="">
            <p>Enter Email Address</p>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              type="email"
            />
          </div>
          <div className="">
            <p>Enter Full Name</p>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              required
            />
          </div>
          <div className="">
            <p>Enter Password</p>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              type="password"
            />
          </div>

          <div className="flex gap-1 items-center ">
            <input
              type="checkbox"
              onChange={(e) => setType(!type)}
              className="w-5 h-5 rounded-full border-gray-300"
            />
            <p className="text-gray-600 text-sm">Register As A Doctor</p>
          </div>
          <Button label="REGISTER" />
          <p className="text-center">
            Already have an account?
            <Link to="/login">
              <span className="text-green-600 cursor-pointer px-2 font-semibold">
                Login
              </span>
            </Link>
          </p>
        </form>
      </div>

      {/* image */}
      <div className="hidden md:block w-1/2 h-screen bg-green-50 flex items-center px-4 justify-center">
        <img alt="nurse" src="/nurse.png" className="h-full object-cover " />
      </div>
    </div>
  );
};

export default Register;
