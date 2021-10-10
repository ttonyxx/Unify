import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Radio,
    RadioGroup,
    HStack,
    Input,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Button,
    Flex,
    Form
} from "@chakra-ui/react"
import { StarIcon, EmailIcon, ArrowForwardIcon } from "@chakra-ui/icons"
import { addUser } from "../../utils"
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../../firebase'

export const StudentFields = (props) => {
    const [user, loading, error] = useAuthState(auth)
    const email = user.email;
    const photoUrl = user.photoURL;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [state, setState] = useState('');
    const [highSchool, setHighSchool] = useState('');
    const [grade, setGrade] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const history = useHistory();
    const handleSubmit = () => {
        console.log("Got here")
        let student = {
            firstName: firstName,
            lastName: lastName,
            type: 'high-school',
            mobile: phoneNumber,
            email: email,
            year: grade,
            state: state,
            majorInterests: [],
            highSchool: highSchool,
            collegeList: [],
            imageUrl: photoUrl,
            };
        console.log(student)
        addUser(user)
        
        history.replace("/dashboard");
    };
    return(
    <FormControl>
        <FormControl id="first-name" isRequired>
            <FormLabel>First name</FormLabel>
            <Input placeholder="First name" onChange={event => setFirstName(event.currentTarget.value)}/>
        </FormControl>
        <FormControl id="last-name" isRequired>
            <FormLabel>Last name</FormLabel>
            <Input placeholder="Last name" onChange={event => setLastName(event.currentTarget.value)}/>
        </FormControl>
        <FormControl id="state" isRequired>
            <FormLabel>State</FormLabel>
            <Select placeholder="Select state" onChange={event => setState(event.currentTarget.getAttribute)}> 
                <option>Alabama</option>
                <option>Alaska</option>
                <option>Arizona</option>
                <option>Arkansas</option>
                <option>California</option>
                <option>Colorado</option>
                <option>Connecticut</option>
                <option>Delaware</option>
                <option>Florida</option>
                <option>Georgia</option>
                <option>Hawaii</option>
                <option>Idaho</option>
                <option>Illinois</option>
                <option>Indiana</option>
                <option>Iowa</option>
                <option>Kansas</option>
                <option>Kentucky</option>
                <option>Louisiana</option>
                <option>Maine</option>
                <option>Maryland</option>
                <option>Massachusetts</option>
                <option>Michigan</option>
                <option>Minnesota</option>
                <option>Mississippi</option>
                <option>Missouri</option>
                <option>Montana</option>
                <option>Nebraska</option>
                <option>Nevada</option>
                <option>New Hampshire</option>
                <option>New Jersey</option>
                <option>New Mexico</option>
                <option>New York</option>
                <option>North Carolina</option>
                <option>North Dakota</option>
                <option>Ohio</option>
                <option>Oklahoma</option>
                <option>Oregon</option>
                <option>Pennsylvania</option>
                <option>Rhode Island</option>
                <option>South Carolina</option>
                <option>South Dakota</option>
                <option>Tennessee</option>
                <option>Texas</option>
                <option>Utah</option>
                <option>Vermont</option>
                <option>Virginia</option>
                <option>Washington</option>
                <option>West Virginia</option>
                <option>Wisconsin</option>
                <option>Wyoming</option>
            </Select>
        </FormControl>
        <FormControl id="high school" isRequired>
            <FormLabel>High School</FormLabel>
            <Input placeholder="Mountain View High School" onChange={event => setHighSchool(event.currentTarget.value)}/>
        </FormControl>
        <FormControl id="grade" isRequired>
            <FormLabel>Grade</FormLabel>
            <Input placeholder="Senior" onChange={event => setGrade(event.currentTarget.value)}/>
        </FormControl>
        <FormControl id="mobile" isRequired>
            <FormLabel>Phone Number</FormLabel>
            <Input placeholder="123-456-7890" onChange={event => setPhoneNumber(event.currentTarget.value)}/>
        </FormControl>
        <Flex
            justifyContent = "center">
            <Button 
                mt={4}
                onClick={handleSubmit}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit">
                Signup
            </Button>
        </Flex>
    </FormControl>
    )}
