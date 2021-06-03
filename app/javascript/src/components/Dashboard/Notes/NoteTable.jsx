import React from "react";
import { Checkbox, Badge, Button } from "neetoui";

export default function NoteTable({
  selectedNoteIds,
  setSelectedNoteIds,
  notes = [],
}) {
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
            <th className="text-left">Title</th>
            <th className="text-left">Description</th>
            <th className="text-center">Tags</th>
            <th className="text-center">Created Date</th>
            <th className="text-center">Due Date</th>
            <th className="text-center">Contact</th>
            <th className="text-right"></th>
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
                <div className="flex flex-row items-center justify-start text-gray-900">
                  {note.title}
                </div>
              </td>
              <td>{note.description}</td>
              <td className="text-center"><Badge color="blue">{note.tag}</Badge></td>
              <td className="text-center">{note.created_at}</td>
              <td className="text-center">
                {note.due_date ? note.due_date : "--"}
              </td>
              <td className="text-center">{note.contact}</td>
              <td className="text-right opacity-0 group-hover:opacity-100">
                <div className="flex flex-row space-x-4">
                  <Button style="icon" icon="ri-pencil-line" />
                  <Button style="icon" icon="ri-delete-bin-line" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
