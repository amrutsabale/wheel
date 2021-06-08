import * as yup from "yup";
const mockContacts = [
  {
    id: "1",
    name: "Neeraj Singh",
    email: "neeraj@bigbinary.com",
    department: "Engineering",
    contactNumber: "(555)-390-102",
    addedToBasecamp: false,
  },
  {
    id: "2",
    name: "Vinay Chandran",
    email: "vinay@bigbinary.com",
    department: "Engineering",
    contactNumber: "99210011001",
    addedToBasecamp: true,
  },
];

const departmentOptions = [
  { value: "engineering", label: "Engineering" },
  { value: "hr", label: "HR" },
];

const contactFormInitialValues = {
  name: "",
  email: "",
  department: {},
  contactNumber: "",
  addedToBasecamp: false,
};

const contactFormValidationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  contactNumber: yup.string().required("Contact Number is required"),
});

export {
  mockContacts,
  departmentOptions,
  contactFormInitialValues,
  contactFormValidationSchema,
};
