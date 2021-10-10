import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth , logout } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import DatePicker from "react-datepicker";
import { 
  Flex, 
  Text, 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td, 
  Tag, 
  Select, 
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  UnorderedList,
  ListItem,
  Link as ChakraLink
} from "@chakra-ui/react";
import { AddIcon, InfoOutlineIcon } from '@chakra-ui/icons'
import { getUser, setColleges } from '../../utils'

import "react-datepicker/dist/react-datepicker.css";
import TuitionData from '../../assets/tuition.json'

const mockStudentData = [
  {
    'name': 'Harvard',
    'date': '1640433600',
    'chance': 'Safety',
    'status': 'Not Started'
  },
  {
    'name': 'Berkeley',
    'date': '1634033600',
    'chance': 'Reach',
    'status': 'Drafted'
  },
  {
    'name': 'Williams',
    'date': '1635033600',
    'chance': 'Target',
    'status': 'Not Started'
  },
  {
    'name': 'EveRy',
    'date': '1635633600',
    'chance': 'Target',
    'status': 'Done'
  },
  {
    'name': 'Berklee',
    'date': '1638533600',
    'chance': 'Reach',
    'status': 'Started'
  }
];

const pickSelectColor = value => {
  switch (value) {
    case 'Not Started':
      return 'gray';
    case 'Started':
      return '#FFAE00';
    case 'Drafted':
      return 'green';
    case 'Done':
      return 'blue';
    default:
      return 'white'
  }
}

const pickChanceColor = value => {
  switch (value) {
    case 'Reach':
      return 'red';
    case 'Target':
      return '#FFAE00';
    case 'Safety':
      return 'green';
    default:
      return 'white'
  }
}

const timeLeftColor = days => {
  if (days <= 7) {
    return 'red'
  } else if (days <= 14) {
    return 'orange'
  } else if (days <= 30) {
    return 'yellow'
  } else if (days <= 60) {
    return 'green'
  } else {
    return 'blue'
  }
}

const ChanceSelectDropdown = ({ college }) => {

  const [chanceColor, setChanceColor] = useState(pickChanceColor(college.chance));

  const changeChanceColor = e => {
    setChanceColor(pickChanceColor(e.target.value))
  }

  return (
    <Select 
      defaultValue={college.chance}
      bg={chanceColor}
      onChange={changeChanceColor}
      color='white'
    >
      {['Safety', 'Target', 'Reach'].map((chance) => (
        <option key={college.name} value={chance} style={{'color': 'black'}} >
          {chance}
        </option>
      ))}
    </Select>
  )
}

const StatusSelectDropdown = ({ college }) => {

  const [selectColor, setSelectColor] = useState(pickSelectColor(college.status));

  const changeSelectColor = e => {
    setSelectColor(pickSelectColor(e.target.value))
  }

  return (
    <Select 
      defaultValue={college.status}
      bg={selectColor}
      onChange={changeSelectColor}
      color='white'
    >
      {['Not Started', 'Started', 'Drafted', "Done"].map((status) => (
        <option key={college.name} value={status} style={{'color': 'black'}} >
          {status}
        </option>
      ))}
    </Select>
  )
}

const sendCollegeData = (name, dueDate, chance, email, collegeList) => {
  const newCollegeList = [...collegeList, {
    'name': name,
    'date': dueDate / 1000,
    'chance': chance,
    'status': 'Not Started'
  }];
  setColleges(email, newCollegeList);
}

const FinancesModal = ({college}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [collegeData, setCollegeData] = useState({
    "name": "University of Southern California",
    "state": "California",
    "state_code": "CA",
    "type": "Private",
    "degree_length": "4 Year",
    "room_and_board": 15395,
    "in_state_tuition": 56225,
    "in_state_total": 71620,
    "out_of_state_tuition": 56225,
    "out_of_state_total": 71620
  }) 
  const [loanAmount, setLoanAmount] = useState(5000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [loanTerms, setLoanTerms] = useState(10);

  useEffect(() => { 
    setCollegeData(TuitionData.find(element => element.name === college.name))
    if (collegeData === {}){
      setCollegeData({
        "name": "University of Southern California",
        "state": "California",
        "state_code": "CA",
        "type": "Private",
        "degree_length": "4 Year",
        "room_and_board": 15395,
        "in_state_tuition": 56225,
        "in_state_total": 71620,
        "out_of_state_tuition": 56225,
        "out_of_state_total": 71620
      })
    }
  }, [college.name, collegeData]);

  return(
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        sx={{
          'minWidth': "70rem",
        }}
      >
        <ModalHeader>Finances for {college.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            {collegeData.name} is a {collegeData.degree_length.toLowerCase()} {collegeData.type.toLowerCase()} institution in {collegeData.state}.
            Here are some statistics on expected costs if you choose to attend this institution.
          </Text>
          <Box height='1rem' />

            <Table variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>
                    Location
                  </Th>
                  <Th isNumeric>
                    Tuition / Yr
                  </Th>
                  <Th isNumeric>
                    Room and Board / Yr
                  </Th >
                  <Th isNumeric>
                    Total Costs / Yr
                  </Th>
                  <Th isNumeric>
                    Total Over {collegeData.degree_length}s
                  </Th>
                  <Th isNumeric>
                    Total Costs / Semester
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    In State 
                  </Td>
                  <Td isNumeric>
                    ${collegeData.in_state_tuition}
                  </Td>
                  <Td isNumeric>
                    ${collegeData.room_and_board}   
                  </Td>
                  <Td isNumeric>
                    ${collegeData.in_state_total}
                  </Td>
                  <Td isNumeric>
                    ${collegeData.in_state_total*parseInt(collegeData.degree_length.split(" ")[0])}
                  </Td>
                  <Td isNumeric>
                    ${Math.floor(collegeData.in_state_total / 2)}
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    Out of State
                  </Td>
                  <Td isNumeric>
                    ${collegeData.out_of_state_tuition}
                  </Td>
                  <Td isNumeric>
                    ${collegeData.room_and_board}   
                  </Td>
                  <Td isNumeric>
                    ${collegeData.out_of_state_total}
                  </Td>
                  <Td isNumeric>
                    ${collegeData.out_of_state_total*parseInt(collegeData.degree_length.split(" ")[0])}
                  </Td>
                  <Td isNumeric>
                    ${Math.floor(collegeData.out_of_state_total / 2)}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
            <Box height='1rem' />

            <UnorderedList>
              <ListItem>To help pay for tuition, <ChakraLink color='teal.500' href="https://studentaid.gov/h/apply-for-aid/fafsa">FAFSA</ChakraLink > is your best friend for financial aid.  </ListItem>
              <ListItem>Resources like <ChakraLink href="https://www.scholarships.com/" color='teal.500'>Scholarships.com</ChakraLink>, an aggregator of additional scholarships that you can apply for, can be useful in finding opportunities to fund college.</ListItem>
              <ListItem>Your <Link to='/search'>Unify connections</Link> can also help with advice on factoring in living costs, which may influence how much money you'll need for college.</ListItem>
              <ListItem>The loan calculator below can help you gauge how much you will have to pay each month to repay your student loans.</ListItem>
              <ListItem>Ultimately, it is up to you and your family to make the best financial decisions in regards to college.              We hope that Unify can be a helpful tool during this time!</ListItem>
            </UnorderedList>
            <Text fontSize="3xl" padding='1.5rem 0 1rem 0'>Loan Calculator</Text>
            <FormControl>
              <FormLabel>Loan Amount</FormLabel>
              <Input defaultValue={loanAmount} type="collegeName" onChange={(event)=>setLoanAmount(parseInt(event.target.value))}/>
              <FormHelperText>In dollars ($)</FormHelperText>
              <Box height='1rem' />
              <FormLabel>Interest Rate</FormLabel>
              <Input defaultValue={interestRate} type="collegeName" onChange={(event)=>setInterestRate(parseInt(event.target.value))}/>
              <FormHelperText>In percentage (%)</FormHelperText>
              <Box height='1rem' />
              <FormLabel>Loan Terms</FormLabel>
              <Input defaultValue={loanTerms} type="collegeName" onChange={(event)=>setLoanTerms(parseInt(event.target.value))}/>
              <FormHelperText>In years</FormHelperText>
              <Box height='1rem' />
            </FormControl>
            <Text>Your monthly payment would be <Badge fontSize="xl" colorScheme='green'>${Math.round(loanAmount*(interestRate/1200 + ((interestRate/1200)/(Math.pow(1+(interestRate/1200), loanTerms*12)-1)))*100)/100}</Badge>!</Text>
        </ModalBody>

        <ModalFooter>
        </ModalFooter>
      </ModalContent>
    </Modal>

    <Button 
      onClick={onOpen}
      colorScheme="green"
      leftIcon={<InfoOutlineIcon />}
      sx={{
      }}
    >
      Info
    </Button>
  </>
  )
}


const StudentDashboard = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [date, setDate] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newCollegeDueDate, setNewCollegeDueDate] = useState(new Date());
  const [newCollegeName, setNewCollegeName] = useState("");
  const [newCollegeChance, setNewCollegeChance] = useState("Safety");
  const [userData, setUserData] = useState({});

  const history = useHistory();

  const collegeAddSubmit = () => {
    sendCollegeData(newCollegeName, newCollegeDueDate, newCollegeChance, userData.email, userData.collegeList);

    setNewCollegeDueDate(new Date());
    setNewCollegeName("");
    setNewCollegeChance("Safety");
    getUser(user.email).then((val) => {
      setUserData(val);
    })
    onClose();
  }

  useEffect(() => {
    setDate(Date.now());
    getUser(user.email).then((val) => {
      setUserData(val);
    })
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (!user) history.replace("/signin");
  }, [user, loading, history]);


  return (
    <Flex
      flexDirection='column'
      padding='0 10rem 5rem 10rem'
    >
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add College</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
                  <FormControl 
                    id="collegeInfo"
                  >
                    <FormLabel>College Name</FormLabel>
                      <Input type="collegeName" onChange={(event)=>setNewCollegeName(event.target.value)}/>
                    <FormHelperText>Any college works!</FormHelperText>
                    <Box height='1rem' />
                    <FormLabel>Due Date</FormLabel>
                    <Box 
                      sx={{
                        'borderStyle': 'solid',
                        'borderColor': 'inherit',
                        'borderWidth': '1px',
                        'borderRadius': '5px',
                        'padding': '0.5rem',
                      }}
                    >
                      <DatePicker 
                        selected={newCollegeDueDate} 
                        onChange={(date) => setNewCollegeDueDate(date)} 
                      />
                    </Box>
                    <FormHelperText>Make sure to double check!</FormHelperText>
                    <Box height='1rem' />
                    <FormLabel>College Chance</FormLabel>
                      <Select 
                        onChange={(event)=>{setNewCollegeChance(event.target.value)}}
                        defaultChecked="Safety"
                        isRequired
                      >
                        {['Safety', 'Target', 'Reach'].map((chance) => (
                          <option key={chance} value={chance} style={{'color': 'black'}} >
                            {chance}
                          </option>
                        ))}
                      </Select>
                     <FormHelperText>Be reasonable!</FormHelperText>
                    <Box height='1rem' />
                    <Button type='submit' colorScheme="blue" mr={3} onSubmit={collegeAddSubmit} onClick={collegeAddSubmit}>
                      Submit
                    </Button>
                  </FormControl>
          </ModalBody>

          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Text fontSize="4xl" padding='1.5rem 0 1rem 0'>Welcome, {user ? user.displayName.split(" ")[0] : ""} 👋</Text>

      <Button 
        onClick={onOpen}
        colorScheme="blue"
        height="2rem"
        width="9rem"
        padding="1.5rem"
        leftIcon={<AddIcon />}
        sx={{
          'alignSelf': 'flex-end',
          'mb': '1rem'
        }}
      >
        Add College
      </Button>

      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>
              College
            </Th>
            <Th>
              Due By
            </Th>
            <Th>
              Time Left
            </Th>
            <Th>
              Chance
            </Th>
            <Th>
              Status
            </Th>
            <Th>
              Finances
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {userData.collegeList && userData.collegeList.map((college) => {
            const dueDate = new Date(college.date * 1000)
            const timeLeft = college.date * 1000 - date
            const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
            return (
              <Tr key={college.name}>
                <Td>
                  {college.name}
                </Td>
                <Td>
                  {`${dueDate.toLocaleDateString()}`}
                </Td>
                <Td>
                  <Badge colorScheme={timeLeftColor(daysLeft)}>
                    {`${daysLeft} days left!`}
                  </Badge>
                </Td>
                <Td>
                  <ChanceSelectDropdown college={college} />
                </Td>
                <Td>
                  <StatusSelectDropdown college={college} />
                </Td>
                <Td> 
                  <FinancesModal college={college} />
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </Flex>
  );
}

export default StudentDashboard;

/*
<Formik>
            <Form>
              <Field>
                <FormControl id="collegeInfo">
                  <FormLabel>College Name</FormLabel>
                    <Input type="collegeName" />
                  <FormHelperText>Any college works!</FormHelperText>
                  <Box height='1rem' />
                  <FormLabel>Due Date</FormLabel>
                  <Box 
                    sx={{
                      'borderStyle': 'solid',
                      'borderColor': 'inherit',
                      'borderWidth': '1px',
                      'borderRadius': '5px',
                      'padding': '0.5rem',
                    }}
                  >
                    <DatePicker 
                      selected={newCollegeDueDate} 
                      onChange={(date) => setNewCollegeDueDate(date)} 
                    />
                  </Box>
                  <FormHelperText>Make sure to double check!</FormHelperText>
                  <Box height='1rem' />
                  <Button colorScheme="blue" mr={3} onClick={collegeAddSubmit}>
                    Submit
                  </Button>
                </FormControl>
              </Field>
            </Form>
          </Formik>

*/