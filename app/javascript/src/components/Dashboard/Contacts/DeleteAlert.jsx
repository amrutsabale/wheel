import React, { useState } from "react";
import { Alert } from "neetoui";

export default function DeleteAlert({ refetch, onClose, selectedContactIds }) {
  const [deleting, setDeleting] = useState(false);
  const isSingleNoteDeletion = selectedContactIds.length === 1;
  const titleText = isSingleNoteDeletion
    ? "Contact"
    : `${selectedContactIds.length} contacts?`;
  const messageText = isSingleNoteDeletion
    ? "Are you sure you want to delete the note? All of your data will be permanently removed from our database forever. This action cannot be undone."
    : "Are you sure you want to continue? This cannot be undone.";

  const handleDelete = async () => {
    try {
      setDeleting(true);
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
