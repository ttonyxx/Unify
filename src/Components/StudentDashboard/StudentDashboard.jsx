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
  Box
} from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons'

import "react-datepicker/dist/react-datepicker.css";

const mockStudentData = [
  {
    'name': 'Harvard',
    'date': '1640433600',
    'status': 'Not Started'
  },
  {
    'name': 'Berkeley',
    'date': '1634033600',
    'status': 'Not Started'
  },
  {
    'name': 'Tsinghua',
    'date': '1635033600',
    'status': 'Not Started'
  },
  {
    'name': 'DeVry',
    'date': '1635633600',
    'status': 'Not Started'
  },
  {
    'name': 'KAIST',
    'date': '1638533600',
    'status': 'Not Started'
  }
];

const pickSelectColor = value => {
  switch (value) {
    case 'Not Started':
      return 'gray';
    case 'Started':
      return 'orange';
    case 'Drafted':
      return 'khaki';
    case 'Done':
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
    return 'gray'
  }
}

const collegeAddSubmit = (data) => {
  console.log(data);
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
        <option value={status} style={{'color': 'black'}} >
          {status}
        </option>
      ))}
    </Select>
  )
}

const StudentDashboard = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [date, setDate] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newCollegeDueDate, setNewCollegeDueDate] = useState(new Date());

  const history = useHistory();

  useEffect(() => {
    setDate(Date.now());
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (!user) history.replace("/signin");
  }, [user, loading, history]);
  return (
    <Flex
      flexDirection='column'
      padding='0 10rem 0 10rem'
    >
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add College</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
            <Button colorScheme="blue" mr={3} onClick={collegeAddSubmit}>
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

      <Table>
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
              Status
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {mockStudentData.map((college) => {
            const dueDate = new Date(college.date * 1000)
            const timeLeft = college.date * 1000 - date
            const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
            return (
              <Tr>
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
                  <StatusSelectDropdown college={college} />
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