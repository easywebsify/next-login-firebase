import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "firebase/compat/auth";
import initFirebase from "../config";
import firebase from "firebase/compat/app";
import { getAuth } from "@firebase/auth";
import { setUserCookie } from "../auth/userCookie";
import { mapUserData } from "../auth/useUser";

initFirebase();

const firebaseAuthConfig = ({ signInSuccessUrl }) => ({
    signInFlow: "popup",
    signInOptions: [
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: false,
        },
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl,
    credentialHelper: "none",
    callbacks: {
        signInSuccessWithAuthResult: async ({ user }, redirectUrl) => {
            const userData = await mapUserData(user);
            setUserCookie(userData);
        },
    },
});

const FirebaseAuth = () => {
    const signInSuccessUrl = "/private";
    return (
        <div>
            <StyledFirebaseAuth
                uiConfig={firebaseAuthConfig({ signInSuccessUrl })}
                firebaseAuth={getAuth()}
                signInSuccessUrl={signInSuccessUrl}
            />
        </div>
    );
};

export default FirebaseAuth;
