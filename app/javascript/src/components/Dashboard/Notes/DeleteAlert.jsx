import React, { useState } from "react";
import { Alert } from "neetoui";
import notesApi from "apis/notes";

export default function DeleteAlert({ refetch, onClose, selectedNoteIds }) {
  const [deleting, setDeleting] = useState(false);
  const isSingleNoteDeletion = selectedNoteIds.length === 1;
  const titleText = isSingleNoteDeletion
    ? "Note"
    : `${selectedNoteIds.length} notes?`;
  const messageText = isSingleNoteDeletion
    ? "Are you sure you want to delete the note? All of your data will be permanently removed from our database forever. This action cannot be undone."
    : "Are you sure you want to continue? This cannot be undone.";

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await notesApi.destroy({ ids: selectedNoteIds });
      onClose();
      refetch();
    } catch (error) {
      logger.error(error);
    } finally {
      setDeleting(false);
    }
  };
  return (
    <Alert
      isOpen
      title={`Delete ${titleText}`}
      message={messageText}
      onClose={onClose}
      submitButtonProps={{
        style: "danger",
        label: isSingleNoteDeletion ? "Delete" : "Continue anyway",
        loading: deleting,
        onClick: handleDelete,
      }}
    />
  );
}
