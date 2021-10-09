import { Box, Image, Text, Badge } from '@chakra-ui/react'
import * as React from 'react'

export const StudentBox = (props) => (
    <Box w="200px" borderWidth="1px" borderRadius="lg" overflow="hidden">
    <Image boxSize="200px" src={props.imageUrl} />

    <Box p="2">

      <Box
        mt="1"
        fontWeight="semibold"
        as="h4"
        lineHeight="tight"
        isTruncated 
      >
        <Text fontSize="lg">{props.firstName} {props.lastName} <Badge mb={1} colorScheme="yellow">{props.grade}</Badge></Text>
      </Box>

      <Box>
            
            <Box as="span" color="gray.600" fontSize="sm">
            {props.highschool}
            </Box>
        </Box>
    </Box>
  </Box>
)