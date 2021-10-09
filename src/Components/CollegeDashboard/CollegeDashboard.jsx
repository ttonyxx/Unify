import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth , logout } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { StudentBox } from "./StudentBox"
import { Text, Badge } from "@chakra-ui/react"

function CollegeDashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [balance, setBalance] = useState('$125.35');
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
        <Text m={5} fontSize="6xl">Welcome, Tony 👋</Text>
        <Text m={5} fontSize="4xl">Your balance is <Badge mb={0.5} fontSize="0.8em">{ balance }</Badge></Text>
        <StudentBox></StudentBox>
    </div>
  );
}
export default CollegeDashboard;