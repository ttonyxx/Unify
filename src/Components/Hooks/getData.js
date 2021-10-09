import { auth , logout } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const GetAuthInfo = () => {
    const [user, loading, error] = useAuthState(auth);
    return [user, loading, error]
};