import React, { useState, useEffect } from "react";
// import notesApi from "apis/notes";
import { Button, PageLoader } from "neetoui";
import EmptyState from "components/Common/EmptyState";
import EmptyNotesListImage from "images/EmptyNotesList";
import { Header, SubHeader } from "neetoui/layouts";
import { mockNotes } from "constants/notes";

import NoteTable from "./NoteTable";
import NewNotePane from "./NewNotePane";
import DeleteAlert from "./DeleteAlert";

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
