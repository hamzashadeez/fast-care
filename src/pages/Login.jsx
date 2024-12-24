import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import LoadingComponent from "../components/LoadingComponent";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate} from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    // sign user
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Done");
        navigate("/dashboard");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        alert(error.message);
      });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen ">
      {loading && <LoadingComponent />}
      <div className="w-full md:block md:w-1/2 h-screen p-8 md:p-24">
        <h1 className="text-green-600 md:mt-12 md:mt-0 font-semibold text-3xl md:text-4xl">
          Welcome Back
        </h1>
        <p className="text-xl">Enter your Credentials to access your account</p>
        <form onSubmit={onSubmit} className="flex flex-col mt-8 gap-3">
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
            <p>Enter Password</p>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              type="password"
            />
          </div>
          <Button
            label="LOGIN"
            onClick={() => {
              console.log("clicked");
            }}
          />
          <p className="text-center">
            Don't have an account?
            <Link to="/register">
              <span className="text-green-600 cursor-pointer px-2 font-semibold">
                Register
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

export default Login;
