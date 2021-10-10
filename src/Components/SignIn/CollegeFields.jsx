import React from 'react'
import { CUIAutoComplete } from 'chakra-ui-autocomplete'
import {
    FormControl,
    FormLabel,
    Select,
    Radio,
    HStack,
    RadioGroup,
    FormHelperText,
    Input,
    Flex,
    Button
} from "@chakra-ui/react"
// theme.js
// theme.js
import { extendTheme } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"
import { addUser } from "../../utils"
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../../firebase'

// Version 1: Using objects
const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: "gray.400",
        color: "white",
      },
      // styles for the `a`
      a: {
        color: "teal.500",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
})

// Version 2: Using functions
const overrides = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        fontFamily: "body",
        color: mode("gray.800", "whiteAlpha.900")(props),
        bg: mode("white", "gray.800")(props),
        lineHeight: "base",
      },
    }),
  },
})

const majors = [
    { value: "Architecture", label: "Architecture" },
    { value: "Anthropology", label: "Anthropology" },
    { value: "Biology", label: "Biology" },
    { value: "Biomedical Engineering", label: "Biomedical Engineering" },
    { value: "Business Administration", label: "Business Administration" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "Computer Science", label: "Computer Science" },
    { value: "Dance", label: "Dance" },
    { value: "Dentistry", label: "Dentistry" },
    { value: "Economics", label: "Economics" },
    { value: "Education", label: "Education" },
    { value: "English", label: "English" },
    { value: "Finance", label: "Finance" },
    { value: "French", label: "French" },
    { value: "Geography", label: "Geography" },
    { value: "History", label: "History" },
    { value: "International Studies", label: "International Studies" },
    { value: "Journalism", label: "Journalism" },
    { value: "Korean", label: "Korean" },
    { value: "Law", label: "Law" },
    { value: "Management", label: "Management" },
    { value: "Neuroscience", label: "Neuroscience" },
    { value: "Optometry", label: "Optometry" },
    { value: "Psychology", label: "Psychology" },
    { value: "Public Health", label: "Public Health" },
    { value: "Sociology", label: "Sociology" },
    { value: "Spanish", label: "Spanish" },
    { value: "Statistics", label: "Statistics" },
    { value: "Teaching", label: "Teaching" },
    { value: "Web Design", label: "Web Design" },
    { value: "Zoology", label: "Zoology" },
    { value: "Undecided", label: "Undecided" }
];


export default function CollegeFields() {
    const [pickerItems, setPickerItems] = React.useState(majors);
    const [selectedItems, setSelectedItems] = React.useState([]);
    const [selected, setSelected] = React.useState([]);

    const handleCreateItem = (item) => {
        setPickerItems((curr) => [...curr, item]);
        setSelectedItems((curr) => [...curr, item]);
    };

    const handleSelectedItemsChange = (selectedItems) => {
        if (selectedItems) {
            setSelectedItems(selectedItems);
        }
    };

    const [user, loading, error] = useAuthState(auth)
    const email = user.email;
    const photoUrl = user.photoURL;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [college, setCollege] = useState('');

    const [grade, setGrade] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const history = useHistory();

    const handleSubmit = () => {
        console.log("Got here")
        let major = "";
        for(var i = 0; i < selectedItems.length; i++)
        {
          if(i > 0)
          {
            major += ", "
          }
          major += selectedItems[i].value
        }
        let mentor = {
            firstName: firstName,
            lastName: lastName,
            type: 'college',
            mobile: phoneNumber,
            email: email,
            year: grade,
            college: college,
            major: major,
            imageUrl: photoUrl,
            rating: 0,
            reviewCount: 0,
            };
        console.log(mentor)
        addUser(mentor)
        
        history.replace("/dashboard");
      };

    return (
        <div>
            <br />

            <FormControl id="first-name" isRequired>
              <FormLabel>First name</FormLabel>
              <Input placeholder="First name" onChange={event => setFirstName(event.currentTarget.value)}/>
            </FormControl>
            <FormControl id="last-name" isRequired>
                <FormLabel>Last name</FormLabel>
                <Input placeholder="Last name" onChange={event => setLastName(event.currentTarget.value)}/>
            </FormControl>

            <FormControl id="school" isRequired colorScheme="facebook">
                <FormLabel>Search for your institution</FormLabel>
                <Select placeholder="College/University" onChange={event => setCollege(event.currentTarget.value)}>
                    <option>University of California Berkeley </option>
                    <option>University of California Santa Cruz </option>
                    <option>University of California Riverside </option>
                    <option>University of California Los Angeles </option>
                    <option>University of California Irvine </option>
                    <option>University of California San Diego </option>
                    <option>University of Southern California </option>
                    <option>Harvard University </option>
                    <option>Stanford University </option>
                    <option>Columbia University </option>
                    <option>Yale University </option>
                    <option>Brown University </option>
                    <option>Massachusetts Institute of Technology </option>
                </Select>
            </FormControl>
            <br />

            <CUIAutoComplete
                label="Select your major"
                placeholder="Start typing"
                onCreateItem={handleCreateItem}
                items={pickerItems}
                selectedItems={selectedItems}
                onSelectedItemsChange={(changes) =>
                    handleSelectedItemsChange(changes.selectedItems)
                }
            />

            <FormControl as="fieldset" isRequired>
                <FormLabel as="legend">Year in school</FormLabel>
                <RadioGroup defaultValue="Senior" onChange={event => setGrade(event)}>
                    <HStack spacing="50px">
                        <Radio value="Freshman">Freshman</Radio>
                        <Radio value="Sophomore">Sophomore</Radio>
                        <Radio value="Junior">Junior</Radio>
                        <Radio value="Senior">Senior</Radio>
                    </HStack>
                </RadioGroup>
            </FormControl>
            <br />
            <FormControl id="phone-number" isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input placeholder="(xxx) xxx - xxxx" onChange={event => setPhoneNumber(event.currentTarget.value)}/>
            </FormControl>

            <Flex
              justifyContent = "center">
              <Button 
                  mt={4}
                  onClick={handleSubmit}
                  colorScheme="teal"
                  type="submit">
                  Signup
              </Button>
            </Flex>

            <br />

        </div>


    );
}