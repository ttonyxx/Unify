import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth , logout } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { StudentBox } from "./StudentBox"
import { Text, Badge, Box, HStack, Tag, IconButton, VStack } from "@chakra-ui/react"
import { ArrowRightIcon } from "@chakra-ui/icons"
import './CollegeDashboard.css'

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  useDisclosure
} from "@chakra-ui/react"
//import ReactCSSTransitionGroup from 'react-transition-group';

function CollegeDashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [balance, setBalance] = useState('$125.35');
  const [chatName, setChatName] = useState('')
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
      uid: "aw3f9a34",
      imageUrl: "https://i.imgur.com/HkLY72h.jpg",
      firstName: "Tony",
      lastName: "Xin",
      highschool: "Mountain View High School",
      grade: "Freshman",
      major: "Physics"
    },
    {
      uid: "aw3f29a34",
      imageUrl: "https://i.imgur.com/HkLY72h.jpg",
      firstName: "Tony",
      lastName: "Xin",
      highschool: "Mountain View High School",
      grade: "Freshman",
      major: "CS"
    },
    {
      uid: "aw3f9a7634",
      imageUrl: "https://i.imgur.com/HkLY72h.jpg",
      firstName: "Tony",
      lastName: "Xin",
      highschool: "Mountain View High School",
      grade: "Freshman",
      major: "Philosophy"
    },
    {
      uid: "aw3f59a34",
      imageUrl: "https://i.imgur.com/HkLY72h.jpg",
      firstName: "Tony",
      lastName: "Xin",
      highschool: "Mountain View High School",
      grade: "Freshman",
      major: "History"
    },
    {
      uid: "aw33f9a34",
      imageUrl: "https://i.imgur.com/HkLY72h.jpg",
      firstName: "Brendan",
      lastName: "Wong",
      highschool: "Mountain View High School",
      grade: "Freshman",
      major: "Math"
    },
  ]

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  const clientItems = clientData.map((client) => 
  <StudentBox setChatName={setChatName} onOpen={onOpen} btnRef={btnRef} key={client.uid} imageUrl={client.imageUrl} firstName={client.firstName} lastName={client.lastName} highschool={client.highschool} grade={client.grade} major={client.major}></StudentBox>
  )

  return (
    <div className="dashboard">
      
        <Text fontSize="6xl">Welcome, {user ? user.displayName.split(" ")[0] : ""} 👋</Text>
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

        

        <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Message {chatName}</DrawerHeader>

          <DrawerBody>
          <Text fontSize="xl" mb={1}><Badge fontSize="0.7em">Hi! My name is Tony</Badge></Text>
          <Text align="right" fontSize="xl" mb={1}><Badge fontSize="0.7em" colorScheme="blue">When do you want to meet?</Badge></Text>
          <Text fontSize="xl" mb={1}><Badge fontSize="0.7em">Does 11am tomorrow work?</Badge></Text>
          <Text align="right" fontSize="xl" mb={1}><Badge fontSize="0.7em" colorScheme="blue">Yeah! See you then!</Badge></Text>
          </DrawerBody>

          <DrawerFooter>
            <Input placeholder="Type here..." />  
            <IconButton
              colorScheme="blue"
              aria-label="Send email"
              icon={<ArrowRightIcon />}
            />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
export default CollegeDashboard;