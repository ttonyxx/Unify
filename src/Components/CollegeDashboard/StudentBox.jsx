import { Box, Image } from '@chakra-ui/react'
import * as React from 'react'

export const StudentBox = (props) => (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
    <Image src={props.imageUrl} />

    <Box p="6">

      <Box
        mt="1"
        fontWeight="semibold"
        as="h4"
        lineHeight="tight"
        isTruncated
      >
        {props.firstName} {props.lastName}
      </Box>
    </Box>
  </Box>
)