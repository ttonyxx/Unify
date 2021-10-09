import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth , logout } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Flex, Text, Table, Thead, Tbody, Tr, Th, Td, Tag, Select} from "@chakra-ui/react";

const mockStudentData = [
  {
    'name': 'Harvard',
    'date': '2012-04-23T18:25:43.511Z',
    'status': 'done'
  },
  {
    'name': 'Berkeley',
    'date': '2012-04-23T18:25:43.511Z',
    'status': 'done'
  },
  {
    'name': 'DeWry',
    'date': '2012-04-23T18:25:43.511Z',
    'status': 'done'
  },
  {
    'name': 'KAIST',
    'date': '2012-04-23T18:25:43.511Z',
    'status': 'done'
  }

];

function StudentDashboard() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();
  useEffect(() => {
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
      <Text 
        fontSize="3xl"
        padding='3rem 0 3rem 0'
      >
        Welcome, {user ? user.displayName.split(" ")[0] : ""}.
      </Text>
      <Table>
        <Thead>
          <Tr>
            <Th>
              College
            </Th>
            <Th>
              Date
            </Th>
            <Th>
              Status
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {mockStudentData.map((college) => {
            return (
              <Tr>
                <Td>
                  {college.name}
                </Td>
                <Td>
                  {college.date}
                </Td>
                <Td>
                  <Select placeholder={"teg"} defaultValue={college.status}>
                    <option value={college.status}>
                      {college.status}
                    </option>
                  </Select>
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