import { Box, Image, Text, Badge, Tooltip, Button } from '@chakra-ui/react'
import { ChatIcon } from '@chakra-ui/icons'
import * as React from 'react'
import './CollegeDashboard/CollegeDashboard.css'

export const StudentBox = (props) => (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" className="studentBox" mr={3}>
    <Image boxSize="220px" src={props.imageUrl} />

    <Box p="2">

      <Box
        mt="1"
        fontWeight="semibold"
        as="h4"
        lineHeight="tight"
        isTruncated 
      >
        <Text fontSize="lg">{props.firstName} {props.lastName} <Tooltip label="Message" aria-label="A tooltip"><ChatIcon ref={props.btnRef} onClick={() => {
          props.setChatName(props.firstName + " " + props.lastName)
          props.onOpen()
        }}>
        Open
      </ChatIcon></Tooltip></Text>
      <Box>
            
            <Box ml={0.3} as="span" color="gray.600" fontSize="sm">
            {props.highschool}
            </Box>
        </Box>
        <Text fontSize="1rem" fontWeight="bold">
        <Badge mb={1} colorScheme="yellow">{props.grade}</Badge>
        <Badge mb={1} ml={1} colorScheme="orange">{props.major}</Badge>
        </Text>

      </Box>

      
    </Box>
  </Box>
)