import React, { useState } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { Input, Textarea, Select } from "neetoui/formik";
import { Button, DateInput, Label, Switch } from "neetoui";
import notesApi from "apis/notes";

export default function NewNoteForm({ onClose, refetch }) {
  const [isDueDateRequired, setIsDueDateRequired] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());

  const handleSubmit = async values => {
    const noteFormValues = {
      ...values,
      dueDate: isDueDateRequired ? dueDate : "",
    };
    try {
      await notesApi.create(noteFormValues);
      refetch();
      onClose();
    } catch (err) {
      logger.error(err);
    }
  };
  return (
    <Formik
      initialValues={{
        title: "",
        tags: {},
        description: "",
        contact: {},
      }}
      onSubmit={handleSubmit}
      validationSchema={yup.object({
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
      })}
    >
      {({ isSubmitting }) => (
        <Form>
          <Input label="Note Title" name="title" className="mb-6" />
          <Select
            className="mb-6"
            label="Tags"
            defaultValue={{ value: "internal", label: "Internal" }}
            placeholder="Select a tag"
            name="tags"
            options={[
              { value: "internal", label: "Internal", color: "blue" },
              {
                value: "agile_workflow",
                label: "Agile Workflow",
                color: "green",
              },
              { value: "bug", label: "Bug", color: "red" },
            ]}
          />
          <Textarea
            label="Note Description"
            name="description"
            rows={8}
            className="mb-6"
          />
          <Select
            className="mb-6"
            label="Assigned Contact"
            defaultValue={{ value: "internal", label: "internal" }}
            placeholder="Select a contact"
            name="contact"
            options={[
              { value: "tom hunk", label: "Tom hunk" },
              { value: "amrut sabale", label: "Amrut Sabale" },
              { value: "john smith", label: "John smith" },
            ]}
          />
          <div className="mb-80">
            <div className="flex justify-between mb-6">
              <Label>Add Due Date to Note</Label>
              <Switch
                checked={isDueDateRequired}
                onChange={e => setIsDueDateRequired(e.target.checked)}
              />
            </div>
            {isDueDateRequired && (
              <DateInput
                label="Due date"
                format="DD/MM/YYYY"
                name="dueDate"
                value={dueDate}
                onChange={setDueDate}
              />
            )}
          </div>
          <div className="nui-pane__footer nui-pane__footer--absolute">
            <Button
              onClick={onClose}
              label="Cancel"
              size="large"
              style="secondary"
            />
            <Button
              type="submit"
              label="Save Changes"
              size="large"
              style="primary"
              className="ml-2"
              disabled={isSubmitting}
              loading={isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
