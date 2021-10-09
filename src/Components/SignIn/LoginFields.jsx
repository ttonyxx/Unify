import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth , signInWithGoogle } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa'
import { Card } from './Card'
import { DividerWithText } from './DividerWithText'
import { LoginForm } from './LoginForm'

export const LoginFields = (props) => (

<Box
bg={useColorModeValue('gray.50', 'inherit')}
minH="100vh"
py="12"
px={{ base: '4', lg: '8' }}

>
<Box maxW="md" mx="auto">
  <Heading textAlign="center" size="xl" fontWeight="extrabold">
    Sign in to your account
  </Heading>
  <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
    <Text as="span">Don&apos;t have an account? </Text>
    <Link href="#">Sign up here</Link>
  </Text>
  <Card>
    <LoginForm />
    <DividerWithText mt="6">or continue with</DividerWithText>
    <SimpleGrid mt="6" columns={3} spacing="3">
      <Button color="currentColor" variant="outline">
        <VisuallyHidden>Login with Facebook</VisuallyHidden>
        <FaFacebook />
      </Button>
      <Button color="currentColor" variant="outline" onClick={ () => {
        signInWithGoogle()
        
      }}>
        <VisuallyHidden>Login with Google</VisuallyHidden>
        <FaGoogle />
      </Button>
      <Button color="currentColor" variant="outline">
        <VisuallyHidden>Login with Github</VisuallyHidden>
        <FaGithub />
      </Button>
    </SimpleGrid>
  </Card>
</Box>
</Box>


  );
