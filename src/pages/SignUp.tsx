import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import styles from './styles/signup.module.scss'
import { Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", { name, email, password });
      navigate("/");
    } catch {
      setError("Signup failed");
    }
  };

  return (
    <div className={styles.signupwrapper}>
        <div className={styles.signupcontainer}>
        <h2>Signup</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
            <input
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            />

            <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Create Account</button>
            <div>
                <span>Already have account? <Link to='/'>Login here</Link> </span>
            </div>
        </form>
        </div>
    </div>
  );
};

export default Signup;
