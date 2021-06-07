import React, { useState, useEffect } from "react";
// import notesApi from "apis/notes";
import { Button, PageLoader } from "neetoui";
import EmptyState from "components/Common/EmptyState";
import EmptyNotesListImage from "images/EmptyNotesList";
import { Header, SubHeader } from "neetoui/layouts";
import { mockContacts } from "constants/contacts";

import NewContactPane from "./NewContactPane";
import DeleteAlert from "./DeleteAlert";
import ContactTable from "./ContactTable";

const Contacts = () => {
  const [loading, setLoading] = useState(true);
  const [showNewContactPane, setShowNewContactPane] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setContacts(mockContacts);
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
        title="Contacts"
        actionBlock={
          <Button
            onClick={() => setShowNewContactPane(true)}
            label="New Contact"
            icon="ri-add-line"
          />
        }
      />
      {contacts.length ? (
        <>
          <SubHeader
            searchProps={{
              value: searchTerm,
              onChange: e => setSearchTerm(e.target.value),
              clear: () => setSearchTerm(""),
            }}
            deleteButtonProps={{
              onClick: () => setShowDeleteAlert(true),
              disabled: !selectedContactIds.length,
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
          <ContactTable
            selectedContactIds={selectedContactIds}
            setSelectedContactIds={setSelectedContactIds}
            setShowDeleteAlert={setShowDeleteAlert}
            contacts={contacts}
          />
        </>
      ) : (
        <EmptyState
          image={EmptyNotesListImage}
          title="Your Contacts list is empty"
          primaryAction={() => setShowNewContactPane(true)}
          primaryActionLabel="Add Contact"
        />
      )}
      <NewContactPane
        showPane={showNewContactPane}
        setShowPane={setShowNewContactPane}
        fetchContacts={fetchContacts}
      />
      {showDeleteAlert && (
        <DeleteAlert
          selectedContactIds={selectedContactIds}
          onClose={() => setShowDeleteAlert(false)}
          refetch={fetchContacts}
        />
      )}
    </>
  );
};

export default Contacts;
