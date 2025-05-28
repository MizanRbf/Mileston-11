import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  // Create User
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Update User
  const updateUser = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  // Login User
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //  GoogleLogin
  const googleLogin = () => {
    return signInWithPopup(auth, provider);
  };

  // Logout User
  const logOutUser = () => {
    return signOut(auth);
  };

  // OnAuthStateChange
  useEffect(() => {
    const unSubsCribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unSubsCribe();
    };
  }, []);

  const authInfo = {
    createUser,
    updateUser,
    loginUser,
    googleLogin,
    logOutUser,
    user,
    setUser,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};
export default AuthProvider;
