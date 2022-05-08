import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "firebase/compat/auth";
import { onIdTokenChanged, getAuth, signOut } from "@firebase/auth";

import initFirebase from "../config";
import {
    removeUserCookie,
    setUserCookie,
    getUserFromCookie,
} from "./userCookie";

const firebaseApp = initFirebase();

export const mapUserData = async (user) => {
    const { uid, email } = user;
    const token = await user.getIdToken(true);
    return {
        id: uid,
        email,
        token,
    };
};

const useUser = () => {
    const [user, setUser] = useState();
    const router = useRouter();

    const logout = async () => {
        const auth = getAuth(firebaseApp);
        return signOut(auth)
            .then(() => {
                router.push("/");
            })
            .catch((e) => {
                console.error(e);
            });
    };

    useEffect(() => {
        const auth = getAuth(firebaseApp);
        const cancelAuthListener = onIdTokenChanged(
            auth,
            async function (userToken) {
                if (userToken) {
                    const userData = await mapUserData(userToken);
                    setUserCookie(userData);
                    setUser(userData);
                } else {
                    removeUserCookie();
                    setUser();
                }
            }
        );

        const userFromCookie = getUserFromCookie();
        if (!userFromCookie) {
            return;
        }
        setUser(userFromCookie);
        return () => cancelAuthListener;
    }, []);

    return { user, logout };
};

export { useUser };
