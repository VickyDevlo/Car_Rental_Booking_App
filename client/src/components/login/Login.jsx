import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import Loader from "../loader/Loader";
import { initialState } from "../../assets/assets";

const Login = () => {
  const {
    setShowLogin,
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

    // ✅ Validate password length if registering
    if (state === "register" && formData.password.trim().length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true); // Start loading
    try {
      const { data } = await axios.post(`/api/user/${state}`, formData);

      if (data?.success) {
        if (state === "register") {
          toast.success("Registration successful! Please log in.");
          setState("login");
          setFormData(initialState);
          return;
        }

        // ✅ Login success
        toast.success("Login successful!");
        setToken(data?.token);
        localStorage.setItem("token", data?.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        setShowLogin(false);
        fetchUser();
      } else {
        toast.error(data?.message);
        setFormData(initialState);
        setRefocus(true);
      }
    } catch (error) {
      toast.error(error.message);
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
    <div
      onClick={() => setShowLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center  
      text-sm text-gray-600 bg-black/50"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] 
        rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div className="w-full">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              autoComplete="off"
              name="name"
              id="name"
              value={formData.name}
              ref={nameRef}
              onChange={handleChange}
              placeholder="Enter your name"
              className="border border-gray-200 rounded w-full p-2 mt-1 
              outline-primary/60 capitalize"
              disabled={loading}
              required
            />
          </div>
        )}

        <div className="w-full">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            autoComplete="off"
            name="email"
            id="email"
            ref={emailRef}
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="border border-gray-200 rounded w-full p-2 mt-1
             outline-primary/60"
            disabled={loading}
            required
          />
        </div>

        <div className="w-full">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            autoComplete="off"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="border border-gray-200 rounded w-full p-2 mt-1
             outline-primary/60"
            disabled={loading}
            required
          />
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
              className="text-primary cursor-pointer"
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
    </div>
  );
};

export default Login;
