import React, { useState, useEffect } from "react";
// import notesApi from "apis/notes";
import { Button, PageLoader } from "neetoui";
import EmptyState from "components/Common/EmptyState";
import EmptyNotesListImage from "images/EmptyNotesList";
import { Header, SubHeader } from "neetoui/layouts";

import NoteTable from "./NoteTable";
import NewNotePane from "./NewNotePane";
import DeleteAlert from "./DeleteAlert";

//mock dummy notes
const mockNotes = [
  {
    id: "1",
    title: "Goto to temple",
    description: "Forward all internal mails",
    tag: { label: "Internal", color: "blue" },
    createdAt: "Apr 10, 2021",
    dueDate: "Apr 10, 2021",
    contact: { value: "tom hunk", label: "Tom hunk" },
  },
  {
    id: "2",
    title: "Read new book",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Doloremque nobis est quidem eos doloribus corrupti itaque accusantium culpa, officia iste, corporis reprehenderit animi beatae placeat odio eaque id ratione dolorum!",
    tag: { label: "Agile Workflow", color: "green" },
    createdAt: "Apr 10, 2021",
    dueDate: "",
    contact: { value: "amrut sabale", label: "Amrut Sabale" },
  },
  {
    id: "3",
    title: "Feedback",
    description: "Feedback V2.0 dsdsd jjjj",
    tag: { label: "Bug", color: "red" },
    createdAt: "Apr 10, 2021",
    dueDate: "Apr 10, 2021",
    contact: { value: "john smith", label: "John smith" },
  },
];

const Notes = () => {
  const [loading, setLoading] = useState(true);
  const [showNewNotePane, setShowNewNotePane] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNoteIds, setSelectedNoteIds] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      // const response = await notesApi.fetch();
      setNotes(mockNotes);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }
  return (
    <>
      <Header
        title="Notes"
        actionBlock={
          <Button
            onClick={() => setShowNewNotePane(true)}
            label="New Note"
            icon="ri-add-line"
          />
        }
      />
      {notes.length ? (
        <>
          <SubHeader
            searchProps={{
              value: searchTerm,
              onChange: e => setSearchTerm(e.target.value),
              clear: () => setSearchTerm(""),
            }}
            deleteButtonProps={{
              onClick: () => setShowDeleteAlert(true),
              disabled: !selectedNoteIds.length,
            }}
            sortProps={{
              option: { value: "title", label: "Name" },
              options: [
                { value: "created_date", label: "Created date" },
                { value: "title", label: "Name" },
              ],
              onClick: () => {},
            }}
            paginationProps={{
              pageNo: 1,
              pageSize: 10,
              count: 50,
            }}
            toggleFilter={() => {}}
          />
          <NoteTable
            selectedNoteIds={selectedNoteIds}
            setSelectedNoteIds={setSelectedNoteIds}
            setShowDeleteAlert={setShowDeleteAlert}
            notes={notes}
          />
        </>
      ) : (
        <EmptyState
          image={EmptyNotesListImage}
          title="Your Notes list is empty"
          primaryAction={() => setShowNewNotePane(true)}
          primaryActionLabel="Add Note"
        />
      )}
      <NewNotePane
        showPane={showNewNotePane}
        setShowPane={setShowNewNotePane}
        fetchNotes={fetchNotes}
      />
      {showDeleteAlert && (
        <DeleteAlert
          selectedNoteIds={selectedNoteIds}
          onClose={() => setShowDeleteAlert(false)}
          refetch={fetchNotes}
        />
      )}
    </>
  );
};

export default Notes;
