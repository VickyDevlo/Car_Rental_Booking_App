import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import Loader from "../loader/Loader";
import { initialState } from "../../assets/assets";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Dialog } from "../shared/Dialog";

const Login = () => {
  const {
    setShowLogin,
    showLogin,
    axios,
    setLoading,
    loading,
    setToken,
    fetchUser,
    navigate,
  } = useAppContext();
  const [formData, setFormData] = useState(initialState);
  const [state, setState] = useState("login");
  const [refocus, setRefocus] = useState(false);
  const [isPassword, setIsPassword] = useState(true);

  const nameRef = useRef();
  const emailRef = useRef();
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const registerFormDisabled =
    !formData.name?.trim() ||
    !formData.email?.trim() ||
    !isValidEmail(formData.email) ||
    !formData.password?.trim();

  const loginFormDisabled =
    !formData.email?.trim() ||
    !isValidEmail(formData.email) ||
    !formData.password?.trim();

  const isDisabled =
    state === "register" ? registerFormDisabled : loginFormDisabled;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state === "register" && formData.password.trim().length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`/api/user/${state}`, formData);
      const data = response.data;

      if (!data?.success) {
        toast.error(data?.message || "Something went wrong.");
        setFormData(initialState);
        setRefocus(true);
        return;
      }

      if (state === "register") {
        toast.success("Registration successful! Please log in.");
        setState("login");
        setFormData(initialState);
        return;
      }

      // ✅ Login Success
      const token = data.token;
      const user = data.user;

      setToken(token);
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      toast.success("Login successful!");

      setShowLogin(false);

      if (fetchUser) {
        await fetchUser();
      }
      if (user?.role === "owner") {
        navigate("/owner");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message || "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state === "register") {
      nameRef.current?.focus();
    } else {
      emailRef.current?.focus();
    }
    setRefocus(false);
  }, [state, refocus]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowLogin(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <Dialog onClose={() => setShowLogin(false)} isOpen={showLogin}>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-4 m-auto items-start"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div className="w-full">
            <label htmlFor="name">Name</label>
            <div
              className="flex items-center rounded p-2 mt-1 border-2
    border-gray-200 focus-within:border-2 focus-within:border-primary/60"
            >
              <input
                type="text"
                autoComplete="off"
                name="name"
                id="name"
                value={formData.name}
                ref={nameRef}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full capitalize focus:outline-none"
                disabled={loading}
                required
              />
            </div>
          </div>
        )}

        <div className="w-full">
          <label htmlFor="email">Email</label>
          <div
            className="flex items-center rounded p-2 mt-1 border-2
                border-gray-200 focus-within:border-2
                 focus-within:border-primary/60"
          >
            <input
              type="email"
              autoComplete="off"
              name="email"
              id="email"
              ref={emailRef}
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full focus:outline-none"
              disabled={loading}
              required
            />
          </div>
        </div>

        <div className="w-full">
          <label htmlFor="password">Password</label>
          <div
            className="flex items-center rounded p-2 mt-1 border-2
                border-gray-200 focus-within:border-2
                focus-within:border-primary/60"
          >
            <input
              type={isPassword ? "password" : "text"}
              autoComplete="off"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full focus:outline-none"
              disabled={loading}
              required
            />
            <button
              type="button"
              onClick={() => setIsPassword(!isPassword)}
              className="cursor-pointer shrink-0"
            >
              {isPassword ? <IoMdEyeOff size={18} /> : <IoMdEye size={18} />}
            </button>
          </div>
        </div>

        {state === "register" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("login");
                setFormData(initialState);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setState("login")}
              className="text-primary cursor-pointer"
            >
              click here
            </span>
          </p>
        ) : (
          <p>
            Create an account?{" "}
            <span
              onClick={() => {
                setState("register");
                setFormData(initialState);
              }}
              className="text-primary cursor-pointer focus:outline-1"
            >
              click here
            </span>
          </p>
        )}

        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={isDisabled}
          type="submit"
          className={`bg-primary hover:bg-primary-dull font-medium tracking-wide 
                      transition-all text-white w-full py-2 rounded-md
                      ${
                        isDisabled || loading
                          ? "opacity-30 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
        >
          {loading ? (
            <Loader className="h-5 w-5 border-2" />
          ) : state === "register" ? (
            "Create Account"
          ) : (
            "Login"
          )}
        </motion.button>
      </form>
    </Dialog>
  );
};

export default Login;
