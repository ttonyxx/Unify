import { Box, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'
import { SiHive, SiMarketo, SiMicrosoft } from 'react-icons/si'
import { ActionButton } from './ActionButton'
import { PricingCard } from './PricingCard'

export const AccountType = ({
    setPage
}) => (
  <Box
    as="section"
    bg={useColorModeValue('gray.50', 'gray.800')}
    py="67"
    px={{
      base: '4',
      md: '200',
    }}
  >
    <SimpleGrid
      columns={{
        base: 1,
        lg: 2,
      }}
      spacing={{
        base: '8',
        lg: '100',
      }}
      maxW="9xl"
      mx="auto"
      justifyItems="right"
      alignItems="center"
    >
      <PricingCard
        data={{
          name: 'Highschool Student',
          features: [
            'Ask college-specific questions to current students',
            'Receive college & major related counseling',
            'Connect with college students across the country',
          ],
        }}
        icon={SiMicrosoft}
        button={
          <ActionButton onClick={() => {setPage(2)}}>
            Register
          </ActionButton>
        }
      />
      <PricingCard
        zIndex={1}
        transform={{
          lg: 'scale(1.05)',
        }}
        data={{
          name: 'College Student',
          features: [
            'Connect with highschoolers and share experiences',
            'Freely advise and directly impact students',
            'Counsel students applying to college and get paid',
          ],
        }}
        icon={SiHive}
        button={<ActionButton onClick={() => {setPage(3)}}>Register</ActionButton>}
      />
    </SimpleGrid>
  </Box>
)
