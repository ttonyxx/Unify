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
    Form,
    Box,
    useColorModeValue,
    Text
} from "@chakra-ui/react"
import { StarIcon, EmailIcon, ArrowForwardIcon } from "@chakra-ui/icons"
import { addUser } from "../../utils"
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../../firebase'
import { CUIAutoComplete } from 'chakra-ui-autocomplete'

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


export const StudentFields = (props) => {

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
    const firstName = user.displayName.split(" ")[0];
    const lastName = user.displayName.split(" ")[1];
    const [state, setState] = useState('');
    const [highSchool, setHighSchool] = useState('');
    const [grade, setGrade] = useState('Senior');
    const [phoneNumber, setPhoneNumber] = useState('');
    const history = useHistory();
    const handleSubmit = () => {
        let majors = [];
        for(var i = 0; i < selectedItems.length; i++)
        {
          majors.push(selectedItems[i].value);
        }
        console.log("Got here")
        let student = {
            firstName: firstName,
            lastName: lastName,
            type: 'high-school',
            mobile: phoneNumber,
            email: email,
            year: grade,
            state: state,
            majorInterests: majors,
            highSchool: highSchool,
            collegeList: [],
            imageUrl: photoUrl,
            };
        console.log(student)
        addUser(student)
        
        history.replace("/dashboard");
    };
    return(
    <Box
    borderColor = 'blackAlpha.50'
    borderWidth = '5px'
    bg={useColorModeValue('gray.50', 'inherit')}
    minH="100vh"
    py="12"
    px={{ base: '4', lg: '8' }}
    margin = '1rem 1rem 6rem 1rem'>
    <FormControl>
        <Text fontSize = "4xl">Welcome {firstName} {lastName}!</Text>
        <FormControl id="state" isRequired margin = "1rem 0rem 1rem 0rem">
            <FormLabel>State</FormLabel>
            <Select placeholder="Select state" onChange={event => setState(event.currentTarget.value)}> 
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
        <FormControl id="high school" isRequired margin = "1rem 0rem 1rem 0rem">
            <FormLabel>High School</FormLabel>
            <Input placeholder="Mountain View High School" onChange={event => setHighSchool(event.currentTarget.value)}/>
        </FormControl>
        <FormControl as="fieldset" isRequired margin = "1rem 0rem 1rem 0rem">
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
        <CUIAutoComplete
                margin = "1rem 0rem 1rem 0rem"
                label="Select your major"
                placeholder="Start typing"
                onCreateItem={handleCreateItem}
                items={pickerItems}
                selectedItems={selectedItems}
                onSelectedItemsChange={(changes) =>
                    handleSelectedItemsChange(changes.selectedItems)
                }
            />
        <FormControl id="mobile" isRequired margin = "1rem 0rem 1rem 0rem">
            <FormLabel>Phone Number</FormLabel>
            <Input placeholder="(xxx) xxx- xxxx" onChange={event => setPhoneNumber(event.currentTarget.value)}/>
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
    </Box>
    )}
