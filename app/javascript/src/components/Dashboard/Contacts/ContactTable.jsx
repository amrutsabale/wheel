import React from "react";
import { Checkbox, Button, Avatar, Tooltip } from "neetoui";

export default function ContactTable({
  selectedContactIds,
  setSelectedContactIds,
  setShowDeleteAlert,
  contacts = [],
}) {
  const handleContactDelete = contactId => {
    setShowDeleteAlert(true);
    setSelectedContactIds([contactId]);
  };

  return (
    <div className="w-full px-4">
      <table className="nui-table nui-table--checkbox">
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={
                  selectedContactIds.length ===
                  contacts.map(contact => contact.id).length
                }
                onClick={() => {
                  const contactIds = contacts.map(contact => contact.id);
                  if (selectedContactIds.length === contactIds.length) {
                    setSelectedContactIds([]);
                  } else {
                    setSelectedContactIds(contactIds);
                  }
                }}
              />
            </th>
            <th className="text-left text-gray-500">Name</th>
            <th className="text-left text-gray-500"> Email</th>
            <th className="text-center text-gray-500">Department</th>
            <th className="text-center text-gray-500">Contact Number</th>
            <th className="text-center text-gray-500">Add to Basecamp</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr
              key={contact.id}
              className={"group cursor-pointer bg-white hover:bg-gray-50"}
            >
              <td>
                <Checkbox
                  checked={selectedContactIds.includes(contact.id)}
                  onClick={event => {
                    event.stopPropagation();
                    const index = selectedContactIds.indexOf(contact.id);

                    if (index > -1) {
                      setSelectedContactIds([
                        ...selectedContactIds.slice(0, index),
                        ...selectedContactIds.slice(index + 1),
                      ]);
                    } else {
                      setSelectedContactIds([
                        ...selectedContactIds,
                        contact.id,
                      ]);
                    }
                  }}
                />
              </td>
              <td>
                <div className="flex items-center">
                  <Avatar
                    size={36}
                    bgClassName="bg-purple-300"
                    contact={{ name: contact.name }}
                    className="mr-3"
                  />
                  {contact.name}
                </div>
              </td>
              <td>{contact.email}</td>
              <td className="text-center">{contact.department}</td>
              <td className="text-center">{contact.contactNumber}</td>
              <td>
                <div className="w-4 m-auto">
                  <Checkbox checked={contact.addedToBasecamp} />
                </div>
              </td>
              <td className="opacity-0 group-hover:opacity-100">
                <div className="flex flex-row space-x-4 justify-end">
                  <Tooltip content={"Edit"} position="bottom">
                    <Button style="icon" icon="ri-pencil-line" />
                  </Tooltip>
                  <Tooltip content={"Delete"} position="bottom">
                    <Button
                      style="icon"
                      icon="ri-delete-bin-line"
                      onClick={() => handleContactDelete(contact.id)}
                    />
                  </Tooltip>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
