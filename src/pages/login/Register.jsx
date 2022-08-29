import { useRef, useState, useEffect ,useContext} from "react";
import './login.css'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import AuthContext from "../../context/AuthProvider";
import axios from '../../api/axios';
import { Link,Navigate,useNavigate } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [num, setNum] = useState();

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const { auth } = useContext(AuthContext);
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd ,email , num }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
        
            setUser('');
            setPwd('');
            setEmail('');
            setNum('');
            setMatchPwd('');
            navigate('/login', { replace: true })
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
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
                   
                    <h1 className='formh1'>Register</h1>
                    <form onSubmit={handleSubmit} className='formLogin'>
                        <label htmlFor="username">
                            Username:
                            <CheckIcon fontSize="2px" className={validName ? "valid" : "hide"} />
                            <CloseIcon fontSize="2px" className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <input
                        className='inputlogin'
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <InfoIcon fontSize="4px" />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                        <label htmlFor="email">
                            Email:
                        </label>
                        <input
                        className='inputlogin'
                            type="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                         <label htmlFor="number">
                            phone:
                         </label>
                        <input
                        className='inputlogin'
                            type="number"
                            id="number"
                            onChange={(e) => setNum(e.target.value)}
                            value={num}
                            required
                        />

                        <label htmlFor="password">
                            Password:
                            <CheckIcon fontSize="2px" className={validPwd ? "valid" : "hide"} />
                            <CloseIcon fontSize="2px" className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                        className='inputlogin'
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"}>
                            <InfoIcon fontSize="4px" />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <CheckIcon fontSize="2px" className={validMatch && matchPwd ? "valid" : "hide"} />
                            <CloseIcon fontSize="2px" className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                        className='inputlogin'
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />

                        <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    </form>
                    <p>
                        Already registered? <tab/>
                        <span className="line">
                            <Link to="/login">Sign In</Link>
                        </span>
                    </p>
                   
                </section>
                <Link className="guest" to="/">Continue as guest</Link>
                </div>
            

    )
}

export default Register
