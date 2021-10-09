import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth , logout } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { StudentBox } from "./StudentBox"
import { Text, Badge, Box, HStack, Tag } from "@chakra-ui/react"
import './CollegeDashboard.css'

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

  let clientData = [
    {
      imageUrl: "https://i.imgur.com/HkLY72h.jpg",
      firstName: "Tony",
      lastName: "Xin",
      highschool: "Mountain View High School",
      grade: "Freshman",
      major: "Physics"
    },
    {
      imageUrl: "https://i.imgur.com/HkLY72h.jpg",
      firstName: "Tony",
      lastName: "Xin",
      highschool: "Mountain View High School",
      grade: "Freshman",
      major: "CS"
    },
    {
      imageUrl: "https://i.imgur.com/HkLY72h.jpg",
      firstName: "Tony",
      lastName: "Xin",
      highschool: "Mountain View High School",
      grade: "Freshman",
      major: "Philosophy"
    },
    {
      imageUrl: "https://i.imgur.com/HkLY72h.jpg",
      firstName: "Tony",
      lastName: "Xin",
      highschool: "Mountain View High School",
      grade: "Freshman",
      major: "History"
    },
    {
      imageUrl: "https://i.imgur.com/HkLY72h.jpg",
      firstName: "Brendan",
      lastName: "Wong",
      highschool: "Mountain View High School",
      grade: "Freshman",
      major: "Math"
    },
  ]

  const clientItems = clientData.map((client) => 
  <StudentBox imageUrl={client.imageUrl} firstName={client.firstName} lastName={client.lastName} highschool={client.highschool} grade={client.grade} major={client.major}></StudentBox>
  )

  return (
    <div className="dashboard">
        <Text fontSize="6xl">Welcome, Tony 👋</Text>
        <Text mt={5} fontSize="4xl">Your balance is <Badge mb={0.5} fontSize="0.8em" colorScheme="green">{ balance }</Badge></Text>
        
        <Box borderRadius="md" borderWidth="1px" p={4} mt="4">
            <Tag fontSize="3xl" colorScheme="gray" mb={2}>Clients</Tag>
            <HStack spacing="10px">
                {clientItems}
            </HStack>
        </Box>

        <Box borderRadius="md" borderWidth="1px" p={4} mt="4">
            <Tag fontSize="3xl" colorScheme="gray" mb={2}>Connections</Tag>
            <HStack spacing="10px">
                {clientItems}
            </HStack>
        </Box>
    </div>
  );
}
export default CollegeDashboard;