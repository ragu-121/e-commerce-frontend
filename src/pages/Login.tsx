import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from './styles/login.module.scss';
import { Link } from "react-router-dom";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate("/products");
        } catch {
            setError("Invalid email or password");
        }
    };

    return (
        <div className={styles.logincontainerwrapper}>
            <div className={styles.loginContainer}>
            <h2>Welcome back</h2>
            <p className={styles.logindesc}>Please enter your details.</p>

            {error && <p className={styles.error}>{error}</p>}

            <form onSubmit={handleSubmit}>
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

                <button type="submit">Login</button>
                <div>
                    <span>Don't have an account? <Link to='/signup'>Click here to SignUp</Link></span>
                </div>
            </form>
            </div>
        </div>
    );
};

export default Login;
