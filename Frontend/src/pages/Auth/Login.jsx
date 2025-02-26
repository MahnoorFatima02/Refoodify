import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, fetchUser } from "../../redux/user/actions";
import { fetchProducts } from "@/redux/product/actions";

import "./login.style.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userAccessToken = useSelector((state) => state.user.accessToken);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  // set up a useEffect to log the userAccessToken whenever it changes
  useEffect(() => {
    if (userAccessToken) {
      console.log("access token updated:", userAccessToken);
    }
  }, [userAccessToken]);

  // handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    // setError("");
    try {
      const result = await dispatch(login({ email, password })).unwrap();
      await dispatch(fetchUser()).unwrap();
      await dispatch(fetchProducts()).unwrap();
      // dispatch(setAccessToken(result.accessToken));
      // dispatch(setRefreshToken(result.refreshToken));
      // navigate("/my-account/account-information");
      navigate("/my-account/account-information");
    } catch (err) {
      console.error("Login failed:", err.message);
    }
  };

  return (
    <section
      className="login-section"
      style={{ backgroundImage: "url('/images/auth/auth.png')" }}
    >
      <div className="login-grid">
        <div className="login-form-container">
          <h2 className="login-title">Welcome</h2>
          <div className="login-links">
            <Link className="login-link" to={"/login"}>
              Login
            </Link>
            <Link className="login-link" to={"/register"}>
              Sign Up
            </Link>
          </div>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="form-input"
                required
              />
            </div>
            <div className="form-remember">
              <div className="form-remember-checkbox">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="form-checkbox"
                />
                <label
                  htmlFor="remember-me"
                  className="form-remember-label ml-2"
                >
                  Remember me
                </label>
              </div>
              <div className="form-forgot">
                <a href="#" className="form-forgot-link">
                  Forgot password?
                </a>
              </div>
            </div>
            {error && <p className="form-error">{error}</p>}
            <div className="form-submit">
              <button type="submit" disabled={loading} className="form-button">
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
            <div className="form-social">
              <p className="form-social-text">Or login with</p>
              <div className="form-social-buttons">
                <button className="form-social-button facebook">
                  Facebook
                </button>
                <button className="form-social-button google">Google</button>
              </div>
            </div>
          </form>
        </div>

        <h1 className="login-heading">
          Reduce Food Wastage for Sustainable Living
        </h1>
      </div>
    </section>
  );
};

export default Login;
