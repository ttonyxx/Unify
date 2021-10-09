import { Box, Image, Text, Badge, Tooltip } from '@chakra-ui/react'
import { ChatIcon } from '@chakra-ui/icons'
import * as React from 'react'
import './CollegeDashboard.css'

export const StudentBox = (props) => (
    <Box w="200px" borderWidth="1px" borderRadius="lg" overflow="hidden" className="studentBox">
    <Image boxSize="200px" src={props.imageUrl} />

    <Box p="2">

      <Box
        mt="1"
        fontWeight="semibold"
        as="h4"
        lineHeight="tight"
        isTruncated 
      >
        <Text fontSize="lg">{props.firstName} {props.lastName} <Tooltip label="Message" aria-label="A tooltip"><ChatIcon></ChatIcon></Tooltip></Text>
        <Badge mb={1} colorScheme="yellow">{props.grade}</Badge><Badge mb={1} ml={1} colorScheme="orange">{props.major}</Badge>

      </Box>

      <Box>
            
            <Box as="span" color="gray.600" fontSize="sm">
            {props.highschool}
            </Box>
        </Box>
    </Box>
  </Box>
)