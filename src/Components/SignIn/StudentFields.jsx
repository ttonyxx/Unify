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

export const StudentFields = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const handleSubmit = event => {
        let user = {
            firstName: firstName,
            lastName: lastName,
            type: 'high-school',
            mobile: '612-932-3438',
            email: 'julianglass@gmail.com',
            year: 'Sophmore',
            state: 'California',
            highSchool: '',
            collegeList: [],
            majorList: []
        }
        addUser(user)
    };
    return(
    <FormControl onSubmit={handleSubmit}>
        <FormControl id="first-name" isRequired
        onChange={event => setFirstName(event.currentTarget.value)}>
            <FormLabel>First name</FormLabel>
            <Input placeholder="First name" />
        </FormControl>
        <FormControl id="last-name" isRequired>
            <FormLabel>Last name</FormLabel>
            <Input placeholder="Last name" />
        </FormControl>
        <FormControl id="state" isRequired>
            <FormLabel>State</FormLabel>
            <Select placeholder="Select state">
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
            <Input placeholder="Mountain View High School" />
        </FormControl>
        <FormControl id="grade" isRequired>
            <FormLabel>Grade</FormLabel>
            <Input placeholder="Senior" />
        </FormControl>
        <FormControl id="movile" isRequired>
            <FormLabel>Phone Number</FormLabel>
            <Input placeholder="123-456-7890" />
        </FormControl>
        <Flex
            justifyContent = "center">
            <Button 
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit">
                Signup
            </Button>
        </Flex>
    </FormControl>
    )}
