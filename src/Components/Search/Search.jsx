import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth , logout } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Flex, Input, Text, Select, Box, WrapItem, Wrap } from "@chakra-ui/react";
import { getCollegeRecommended, getRecommended, getMajorRecommended, getUser, filterCollege, filterMajor } from "../../utils";
import { StudentBox } from "../StudentBox"
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Badge,
    IconButton
  } from "@chakra-ui/react"
  import { ArrowRightIcon } from "@chakra-ui/icons"

function Search() {
  const [user, loading, error] = useAuthState(auth);
  const [studentItems, setStudentItems] = useState([])
  const [userData, setUserData] = useState(null)
  const [searching, setSearching] = useState(false)
  const history = useHistory();

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const [chatName, setChatName] = useState('')

  let users = [];

  let tempUserData;
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    getUser(user.email).then((val) => {
        setUserData(val)
        tempUserData = val
        getRecommended('colleges')
    });
  }, [user]);

  function searchFor(searchVal) {
      if (searchVal != '') {
          setSearching(true)
      }
      users = []
    filterCollege(searchVal).then((val) => {
        users = val
        filterMajor(searchVal).then((val) => {
            if (val.length != 0) users = val
            updateStudentItems()
        })
    })
    
  }

  function getRecommended(rec) {
      users = []
      if (userData) {
        if (rec == 'colleges') {
            getCollegeRecommended(userData).then((val) => {
                users = val
                updateStudentItems()
            })
        } else {
            getMajorRecommended(userData).then((val) => {
                users = val
                updateStudentItems()
            })
        }
      } else {
        getCollegeRecommended(tempUserData).then((val) => {
            users = val
            updateStudentItems()
        })
      }
  }
  
  function updateStudentItems() {
    setStudentItems(users.map((client) => 
        <WrapItem><StudentBox setChatName={setChatName} onOpen={onOpen} btnRef={btnRef} key={client.email} imageUrl={client.imageUrl} firstName={client.firstName} lastName={client.lastName} highschool={client.college} grade={client.year} major={client.major}></StudentBox></WrapItem>
    ))
  }

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (!user) history.replace("/signin");
  }, [user, loading, history]);
  return (
    <Flex
        flexDirection='column'
        padding='3rem 10rem 0 10rem'
        alignItems="left"
    >
        <Flex
        flexDirection='row'
        alignItems="center"
        >
            <Input height="60px" fontSize="30px" colorScheme="blue" focusBorderColor="blue.500" placeholder="Search " onChange={event => {
                searchFor(event.currentTarget.value)
                
                }}  
            
            />

            
        </Flex>
        {
        !searching ?
        (<Flex
            flexDirection='row'
            alignItems="left"
            >
                <Text fontSize="3xl" mt={5}>Recommendations by
                </Text>
                <Select width="150px" mt={6} ml={2} onChange={event => {
                    getRecommended(event.currentTarget.value)
                    
                    }}>
                    <option default value="colleges">Colleges 🏫</option>
                    <option value="major">Major 📚</option>
                </Select>
            </Flex>)
       : (<></>)}
        

        <Wrap mt={3}>
                {studentItems}
        </Wrap>

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
    </Flex>
  );
}
export default Search;