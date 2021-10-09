import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth , signInWithGoogle } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { LoginFields } from "./LoginFields";
import { AccountType } from "./AccountType";
import { StudentFields } from "./StudentFields";

function SignIn() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [page, setPage] = useState(0);
  let display = <LoginFields></LoginFields>;

  const history = useHistory();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      setPage(1)
    }
  }, [user, loading]);

  if (page == 1) {
    display = <AccountType setPage={setPage}></AccountType>
  }
  else if (page == 2) {
    display = <StudentFields setPage={setPage}></StudentFields>
  }

  return (
    <div>
      { display }
    </div>
  );
}
export default SignIn;
