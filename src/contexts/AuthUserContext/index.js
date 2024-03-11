import { createContext, useState } from "react";
import { auth, providerGoogle } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import instance from "../../axios";
const AuthUserContext = createContext();

export function AuthUserProvider({ children }) {
    const [user, setUser] = useState();
    const loginWithAccount = (account) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await instance.post("/auth/login", account);
                resolve(res);
            } catch (err) {
                reject(err);
            }
        });
    };
    const loginWithGoogle = () => {
        return new Promise(async (resolve, reject) => {
            try {
                await signInWithPopup(auth, providerGoogle);
                const res = await instance.post(
                    "/auth/loginWithGoogle",
                    auth.currentUser
                );

                resolve(res);
            } catch (err) {
                reject(err);
            }
        });
    };

    const logout = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await instance.post("/auth/logout");
                resolve(res);
            } catch (err) {
                reject(err);
            }
        });
    };

    return (
        <AuthUserContext.Provider
            value={{
                user,
                setUser,
                loginWithAccount,
                loginWithGoogle,
                logout,
            }}>
            {children}
        </AuthUserContext.Provider>
    );
}

export default AuthUserContext;
