const mockNotes = [
  {
    id: "1",
    title: "Goto to temple",
    description: "Forward all internal mails",
    tag: { value: "internal", label: "Internal" },
    createdAt: "Apr 10, 2021",
    dueDate: "Apr 10, 2021",
    contact: { value: "tom_hunk", label: "Tom hunk" },
  },
  {
    id: "2",
    title: "Read new book",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Doloremque nobis est quidem eos doloribus corrupti itaque accusantium culpa, officia iste, corporis reprehenderit animi beatae placeat odio eaque id ratione dolorum!",
    tag: { label: "Agile Workflow", value: "agile_workflow" },
    createdAt: "Apr 10, 2021",
    dueDate: "",
    contact: { value: "amrut_sabale", label: "Amrut Sabale" },
  },
  {
    id: "3",
    title: "Feedback",
    description: "Feedback V2.0 dsdsd jjjj",
    tag: { value: "bug", label: "Bug" },
    createdAt: "Apr 10, 2021",
    dueDate: "Apr 10, 2021",
    contact: { value: "john_smith", label: "John smith" },
  },
];

const tagsColors = {
  internal: "blue",
  agile_workflow: "green",
  bug: "red",
};

const tagOptions = [
  { value: "internal", label: "Internal" },
  {
    value: "agile_workflow",
    label: "Agile Workflow",
  },
  { value: "bug", label: "Bug" },
];

const contactOptions = [
  { value: "tom_hunk", label: "Tom hunk" },
  { value: "amrut_sabale", label: "Amrut Sabale" },
  { value: "john_smith", label: "John smith" },
];

export { mockNotes, tagsColors, tagOptions, contactOptions };
