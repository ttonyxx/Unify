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
    Input
} from "@chakra-ui/react"
import { MultiSelect } from "react-multi-select-component";
import ReactDOM from "react-dom";
import { ThemeProvider, CSSReset, Box, Stack, Heading } from "@chakra-ui/core";


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

    return (
        <div>
            <CUIAutoComplete
                label="Select your major(s)"
                placeholder="Start typing"
                onCreateItem={handleCreateItem}
                items={pickerItems}
                selectedItems={selectedItems}
                onSelectedItemsChange={(changes) =>
                    handleSelectedItemsChange(changes.selectedItems)
                }
            />

            <FormControl id="school" isRequired>
                <FormLabel>Search for your institution</FormLabel>
                <Select placeholder="College/University">
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

            <FormControl as="fieldset" isRequired>
                <FormLabel as="legend">Year in school</FormLabel>
                <RadioGroup defaultValue="Itachi">
                    <HStack spacing="50px">
                        <Radio value="Freshman">Freshman</Radio>
                        <Radio value="Sophomore">Sophomore</Radio>
                        <Radio value="Junior">Junior</Radio>
                        <Radio value="Senior">Senior</Radio>
                    </HStack>
                </RadioGroup>
            </FormControl>
            <FormControl id="first-name" isRequired>
                <FormLabel>First name</FormLabel>
                <Input placeholder="First name" />
            </FormControl>
        </div>


    );
}