import React from "react";
import { Checkbox, Badge, Button, Avatar, Tooltip } from "neetoui";
import { tagsInfo, contactInfo } from "constants/notes";
import { formattedDate } from "utils/date";

export default function NoteTable({
  selectedNoteIds,
  setSelectedNoteIds,
  setShowDeleteAlert,
  notes = [],
}) {
  const handleNoteDelete = noteId => {
    setShowDeleteAlert(true);
    setSelectedNoteIds([noteId]);
  };

  return (
    <div className="w-full px-4">
      <table className="nui-table nui-table--checkbox">
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={
                  selectedNoteIds.length === notes.map(note => note.id).length
                }
                onClick={() => {
                  const noteIds = notes.map(note => note.id);
                  if (selectedNoteIds.length === noteIds.length) {
                    setSelectedNoteIds([]);
                  } else {
                    setSelectedNoteIds(noteIds);
                  }
                }}
              />
            </th>
            <th className="text-left text-gray-500">Title</th>
            <th className="text-left text-gray-500"> Description</th>
            <th className="text-center text-gray-500">Tags</th>
            <th className="text-center text-gray-500">Created Date</th>
            <th className="text-center text-gray-500">Due Date</th>
            <th className="text-center text-gray-500">Contact</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {notes.map(note => (
            <tr
              key={note.id}
              className={"group cursor-pointer bg-white hover:bg-gray-50"}
            >
              <td>
                <Checkbox
                  checked={selectedNoteIds.includes(note.id)}
                  onClick={event => {
                    event.stopPropagation();
                    const index = selectedNoteIds.indexOf(note.id);

                    if (index > -1) {
                      setSelectedNoteIds([
                        ...selectedNoteIds.slice(0, index),
                        ...selectedNoteIds.slice(index + 1),
                      ]);
                    } else {
                      setSelectedNoteIds([...selectedNoteIds, note.id]);
                    }
                  }}
                />
              </td>
              <td>
                <Button
                  type="link"
                  className="text-purple-500"
                  label={note.title}
                  style="text"
                />
              </td>
              <td>
                <div className="w-28 truncate">{note.description}</div>
              </td>
              <td className="text-center">
                <Badge color={tagsInfo[note.tag]?.color}>
                  {tagsInfo[note.tag]?.label}
                </Badge>
              </td>
              <td className="text-center">{formattedDate(note.createdAt)}</td>
              <td className="text-center">
                {note.dueDate ? formattedDate(note.dueDate) : "--"}
              </td>
              <td className="flex justify-center">
                <Avatar
                  size={36}
                  bgClassName="bg-purple-300"
                  contact={{ name: contactInfo[note.contact] }}
                />
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
                      onClick={() => handleNoteDelete(note.id)}
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
