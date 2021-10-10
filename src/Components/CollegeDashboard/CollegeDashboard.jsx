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
import { getHighSchoolers } from '../../utils'

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
  useDisclosure,
  Wrap,
  WrapItem
} from "@chakra-ui/react"
//import ReactCSSTransitionGroup from 'react-transition-group';

function CollegeDashboard({ sendMessage }) {
  const [user, loading, error] = useAuthState(auth);
  const [message, setMessage] = useState('');
  const [balance, setBalance] = useState('$125.35');
  const [messages, setMessages] = useState('7 messages')
  const [chatName, setChatName] = useState('')
  const history = useHistory();
  const [studentItems, setStudentItems] = useState('')
  const toast = useToast()
  const [value, setValue] = useState("")

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
      getHighSchoolers().then((val) => {
        console.log(val)
        setStudentItems(val.map((client) =>
        <WrapItem><StudentBox setChatName={setChatName} onOpen={onOpen} btnRef={btnRef} key={client.email} imageUrl={client.imageUrl} firstName={client.firstName} lastName={client.lastName} highschool={client.highSchool} grade={client.year} major={client.majorInterests[0]}></StudentBox></WrapItem>
      ))

    });
  }, [user]);
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
        imageUrl: "https://media-exp1.licdn.com/dms/image/C5603AQEVKeqObK2hPg/profile-displayphoto-shrink_800_800/0/1591815570240?e=1639612800&v=beta&t=SMlPBHhkQAvdZHQWU0fZKp4QXbhqKvrt6ZuagzZzRTI",
        firstName: "Daniel",
        lastName: "Roberts",
        highschool: "Gunn High School",
        grade: "Senior",
        major: "Physics"
      },
      {
        uid: "aw3f29a34",
        imageUrl: "https://media-exp1.licdn.com/dms/image/C5603AQHbAm8N27mUQg/profile-displayphoto-shrink_800_800/0/1633558699784?e=1639612800&v=beta&t=Tvt5qfdrOT5a3bXXHUKz7tzxBd-3_J1bneisPQSaggo",
        firstName: "Jessica",
        lastName: "Kim",
        highschool: "Palo Alto High School",
        grade: "Senior",
        major: "Computer Science"
      },
      {
        uid: "aw3f9a7634",
        imageUrl: "https://media-exp1.licdn.com/dms/image/C5603AQHG26n2l1UKTg/profile-displayphoto-shrink_800_800/0/1629759744508?e=1639612800&v=beta&t=NRuCfbkSF_-7Wf_lgOA-1InKLRzYb3PTFmopyebZiOw",
        firstName: "Hannah",
        lastName: "James",
        highschool: "Monta Vista High School",
        grade: "Senior",
        major: "Philosophy"
      },
      {
        uid: "aw3f59a34",
        imageUrl: "https://media-exp1.licdn.com/dms/image/C4E03AQFMehML0sVv3g/profile-displayphoto-shrink_800_800/0/1565411626805?e=1639612800&v=beta&t=Rbc25waxqvJSHUwFWJTkKH324-bIxfwC038OPg1PARM",
        firstName: "Ricky",
        lastName: "Kumar",
        highschool: "Lynbrook High School",
        grade: "Senior",
        major: "History"
      },
      {
        uid: "aw33f9a34",
        imageUrl: "https://drive.google.com/uc?id=1NHflgFKVhuOmzaCaIxc-6QckRzDeePzD",
        firstName: "Olivia",
        lastName: "Lai",
        highschool: "Mountain View High School",
        grade: "Junior",
        major: "EECS"
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
          <Wrap>
            {studentItems}
          </Wrap>
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
              autocomplete="false"
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
