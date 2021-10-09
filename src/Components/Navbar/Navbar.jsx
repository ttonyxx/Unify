import React, { useEffect, useState } from "react";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Spacer } from "@chakra-ui/layout";
import Logo from '../../assets/hhl.svg'
import { Link } from 'react-router-dom';
import { GetAuthInfo } from '../Hooks/getData';
import { logout } from "../../firebase";
import { Button, Avatar } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom'

const Navbar = () => {
  const [user, loading, error] = GetAuthInfo();
  const [location] = useState(useLocation());

  console.log(location.pathname)
  useEffect(() => {
    
  }, [user, loading]);

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
        alt="Unify Logo"
        height='3rem'
        margin="1rem 0.5rem 1rem 0rem"
      />
      <Spacer />
      {user ?
        (<Link to='/dashboard'>
          Dashboard
        </Link>) : (<></>)
      }
      {user ? 
        (<Button 
          onClick={logout}
          color='black'
        >
          Logout
          <Avatar
            size="xs"
            ml={1}
            src={user.photoURL}
          />{" "}
        </Button>) : 
        (<Link to='/signin'>
          Sign In
        </Link>
      )}
    </Flex>
  )
};

export default Navbar;