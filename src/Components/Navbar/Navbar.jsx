import React, { useEffect, useState } from "react";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Spacer } from "@chakra-ui/layout";
import Logo from '../../assets/hhl.svg'
import { Link, useHistory } from 'react-router-dom';
import { GetAuthInfo } from '../Hooks/getData';
import { logout } from "../../firebase";
import { Button, Avatar, Text } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom'
import { getUser } from '../../utils'

const Navbar = () => {
  const [user, loading, error] = GetAuthInfo();
  const [location, setLocation] = useState(useLocation());
  const [userData, setUserData] = useState('');
  

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    getUser(user.email).then((val) => {
        setUserData(val)
    });
  }, [user]);

  return (
    <Flex 
      flexDirection='row'
      backgroundColor='#33507b'
      alignItems='center'
      color="white"
      sx={{
        padding: '0 1rem 0 1rem',
        gap: "1rem"
      }}
    >
      <Image 
        src={Logo} 
        ml={4}
        mt={2}
        mb={2}
        alt="Unify Logo"
        height='3rem'
      /><Text ml={-4} fontSize="2xl" color="gray.500">nify</Text>
      <Spacer />
      {user && location.pathname != '/signin' ?
        (<Link to='/dashboard'>
          Dashboard
        </Link>) : (<></>)
      }
      {user && location.pathname != '/signin' && userData.type=='high-school' ?
        (<Link to='/search'>
          Explore
        </Link>) : (<></>)
      }
      {user && location.pathname != '/signin' ? 
        (<Button 
          onClick={logout}
          color='black'
        >
          Logout
          <Avatar
            size="xs"
            ml={3}
            src={user.photoURL}
          />{" "}
        </Button>) : (<></>)
      }
      {
        !user && location.pathname != '/signin' ?
        (<Link to='/signin'>
          Sign In
        </Link>)
       : (<></>)}
    </Flex>
  )
};

export default Navbar;