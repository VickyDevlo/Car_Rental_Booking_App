import { useEffect, useRef, useState } from "react";

const Login = ({ showLogin, setShowLogin }) => {
  const initialState = {
    name: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [state, setState] = useState("login");

  const nameRef = useRef();
  const emailRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    state === "register" && setState("login");
    console.log(formData);
    setFormData(initialState);
  };

  useEffect(() => {
    if (state === "register") {
      nameRef.current?.focus();
    } else {
      emailRef.current?.focus();
    }
  }, [state]);

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

        <button
          disabled={isDisabled}
          type="submit"
          className={`bg-primary hover:bg-primary-dull font-medium tracking-wide 
    transition-all text-white w-full py-2 rounded-md
    ${isDisabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
        >
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
