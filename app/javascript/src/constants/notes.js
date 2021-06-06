const mockNotes = [
  {
    id: "1",
    title: "Goto to temple",
    description: "Forward all internal mails",
    tag: "internal",
    createdAt: "Apr 10, 2021",
    dueDate: "Apr 10, 2021",
    contact: "tom_hunk",
  },
  {
    id: "2",
    title: "Read new book",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Doloremque nobis est quidem eos doloribus corrupti itaque accusantium culpa, officia iste, corporis reprehenderit animi beatae placeat odio eaque id ratione dolorum!",
    tag: "agile_workflow",
    createdAt: "Apr 10, 2021",
    dueDate: "",
    contact: "amrut_sabale",
  },
  {
    id: "3",
    title: "Feedback",
    description: "Feedback V2.0 dsdsd jjjj",
    tag: "bug",
    createdAt: "Apr 10, 2021",
    dueDate: "Apr 10, 2021",
    contact: "john_smith",
  },
];

const tagsInfo = {
  internal: { color: "blue", label: "Internal" },
  agile_workflow: { color: "green", label: "Agile Workflow" },
  bug: { color: "red", label: "Bug" },
};

const tagOptions = [
  { value: "internal", label: "Internal" },
  {
    value: "agile_workflow",
    label: "Agile Workflow",
  },
  { value: "bug", label: "Bug" },
];

const contactInfo = {
  tom_hunk: "Tom Hunk",
  amrut_sabale: "Amrut Sabale",
  john_smith: "John Smith",
};

const contactOptions = [
  { value: "tom_hunk", label: "Tom hunk" },
  { value: "amrut_sabale", label: "Amrut Sabale" },
  { value: "john_smith", label: "John smith" },
];

export { mockNotes, tagsInfo, tagOptions, contactInfo, contactOptions };
