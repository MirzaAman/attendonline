import React, { useEffect, useState } from 'react';
import { auth, db } from '../Firebase/Config';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import { getAuth } from 'firebase/auth'
import './style.css'
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginBtn, setLoginBtn] = useState('Login');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const navigate = useNavigate();

    const [user, setUser] = useState(null)

    useEffect(() => {
        getAuth().onAuthStateChanged((user) => {
            if (user != null) {
                setUser(true)
                navigate('/')
            } else {
                setUser(false)
            }
        })
    })

    const checkUserProfileExists = async () => {
        const user = auth.currentUser;
        if (!user) {
            // User is not logged in
            return;
        }

        const uid = user.uid;
        const userProfilesRef = collection(db, 'profiles', uid, 'personal');
        const q = query(userProfilesRef, where('uid', '==', uid));

        try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                // The user profile exists in Firestore. Navigate to the profile page.
                // You can access user data using querySnapshot.docs[0].data()
                 // Use React Router for navigation
                navigate('/')
            } else {
                // The user profile doesn't exist in Firestore. Navigate to the home screen.
                navigate('/en/auth/user/profile'); // Use React Router for navigation
            }
        } catch (error) {
            console.error('Error checking user profile: ', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoginBtn('Login..')

        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            setLoginBtn('Login')
            toast.success(`Logged in as ${userCredential.user.email}`, {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined
            })
            navigate('/en/auth/user/profile');
            // setTimeout(async () => {
                
            // }, 3000)
        }).catch((error) => {
            setLoginBtn('Login')
            toast.error('No user found or bad credenitals', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined
            })
        })
    };

    return (
        <>
            <ToastContainer />
            <div className="whole-container">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">Login</div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                            {loginBtn}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
