import { useRef, useState, useEffect,useContext } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './login.css'
import axios from '../..//api/axios';
import AuthContext from "../../context/AuthProvider";

const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useAuth();
    const { auth } = useContext(AuthContext);


    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, roles, accessToken });
       
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }
    function verify(){
        if(Boolean(auth?.user)){
            navigate("/", { replace: true })
        }

    }
    useEffect(()=>{verify()})

    return (
        
        <div className='login'>
        <section className='section'>
            <h1 className='formh1'>Sign In</h1>
            <form className='formLogin' onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    className='inputlogin'
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    placeholder="Enter your username"
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    className='inputlogin'
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    placeholder="Enter your password"
                    required
                />
                <button>Sign In</button>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            </form>
           
            <p>
                Need an Account? <tab/>
                <span className="line">
                    <Link to="/register">Sign Up</Link>
                </span>
            </p>
        </section>
        </div>

    )
        
}

export default Login
