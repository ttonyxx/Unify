import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, logout } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { StudentBox } from "../StudentBox"
import { Text, Badge, Box, HStack, Tag, IconButton, VStack } from "@chakra-ui/react"
import { Stack, useToast } from '@chakra-ui/react'
import { ArrowRightIcon } from "@chakra-ui/icons"
import './CollegeDashboard.css'
import { EmailIcon } from '@chakra-ui/icons'
import { nanoid } from 'nanoid';

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

function CollegeDashboard({ sendMessage }) {
  const [user, loading, error] = useAuthState(auth);
  const [message, setMessage] = useState('');
  const [balance, setBalance] = useState('$125.35');
  const [messages, setMessages] = useState('7 messages')
  const [chatName, setChatName] = useState('')
  const history = useHistory();
  const [password, setPassword] = useState('');
  const toast = useToast()
  const [value, setValue] = useState("")

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (!user) history.replace("/signin");
  }, [user, loading]);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  function handleSubmit(e) {
    e.preventDefault();
    if (value === '') {
      toast({
        title: "Please enter the text.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      })
      return;
    }
    else{
      console.log(value)
      setMessage(value)
    }
    }

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


    const clientItems = clientData.map((client) =>
      <StudentBox setChatName={setChatName} onOpen={onOpen} btnRef={btnRef} key={client.uid} imageUrl={client.imageUrl} firstName={client.firstName} lastName={client.lastName} highschool={client.highschool} grade={client.grade} major={client.major}></StudentBox>
    )

    return (
      <div className="dashboard">

        <Text fontSize="6xl">Welcome, {user ? user.displayName.split(" ")[0] : ""} 👋</Text>
        <Text mt={5} fontSize="4xl">Your balance is <Badge mb={0.5} fontSize="0.8em" colorScheme="green">{balance}</Badge></Text>
        <Text mt={2} fontSize="2xl">You have <Badge mb={0.5} fontSize="0.8em" colorScheme="blue">{messages}</Badge> in your inbox <IconButton
          colorScheme="blue"
          aria-label="View inbox"
          size="sm"
          icon={<EmailIcon />}
        /></Text>

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
              <Text align="right" fontSize="xl" mb={1}><Badge fontSize="0.7em" colorScheme="blue">{message}</Badge></Text>
            </DrawerBody>

            <DrawerFooter>
              <form onSubmit={handleSubmit}>
              <Stack spacing={5}>
              <Input
              id = "message-box"
              mt={5}
              width={280} 
              value={value} 
              variant="outline" 
              type="text" 
              placeholder="Enter your message"
              onChange={(e)=>setValue(e.target.value)} />
              <Button colorScheme="teal" type="submit">Send</Button>
        </Stack>
        </form>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    );
}
  export default CollegeDashboard;
