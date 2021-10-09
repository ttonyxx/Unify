import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth , logout } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function StudentDashboard() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (!user) history.replace("/signin");
  }, [user, loading]);
  return (
    <div className="dashboard">
        <button onClick={logout}>Log out</button>
    </div>
  );
}
export default StudentDashboard;