import { v4 as uuidv4 } from "uuid"
const generateID = () => {

    const id = uuidv4()
    return id.split('-')[0]
}
export const blank_employee = {
    'f_name': '',
    'l_name': '',
    'address': "",
    'userName': '',
    'designation': '',
    'email': '',
    'phone': '',
    'join_date': "",
    'password': '',
    'department': '',
    'id': generateID()
}
export const position_structure = {
    admin: {
        name: 'Administration',
        positions:
            [
                "Chief Officer",
                "Assistant"
            ]
    },
    accounts: {
        name: 'Accounts',
        positions: [
            "Accountant",
            "Assistant"
        ]
    },
    hr: {
        name: 'Human Resources',
        positions: [
            "Chief Officer",
            "Officer"
        ]
    },
    it: {
        name: 'IT',
        positions:
            [
                "Head",
                "Assistant"
            ]
    },
    planning: {
        name: "Planning",
        positions:
            [
                "Advisor",
                "Senior Planner",
                "Planer",
                "Associate Planer",
                "Intern"
            ]
    },
    survey: {
        name: "Survey",
        positions:
            [
                "Senior Surveyor",
                "Surveyor",
                "Intern"
            ]
    },
    rnd: {
        name: 'Research & Development',
        positions:
            [
                "Team Lead",
                "Senior Software Developer",
                "Software Developer",
                "Junior Developer",
                "Graphics Designer",
                "Document/Content Writer",
                "Back-end Developer",
                "Front-end Developer",
                "Intern"
            ]
    },
}