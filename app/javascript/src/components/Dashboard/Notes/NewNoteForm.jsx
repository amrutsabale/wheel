import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Input, Textarea, Select } from "neetoui/formik";
import { Button, DateInput, Label, Switch } from "neetoui";
import notesApi from "apis/notes";
import {
  contactOptions,
  tagOptions,
  noteFormInitialValues,
  noteFormValidationSchema,
} from "constants/notes";

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
      initialValues={noteFormInitialValues}
      onSubmit={handleSubmit}
      validationSchema={noteFormValidationSchema}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          <Input label="Note Title" name="title" />
          <Select
            label="Tags"
            placeholder="Select a tag"
            name="tags"
            options={tagOptions}
          />
          <Textarea label="Note Description" name="description" rows={8} />
          <Select
            label="Assigned Contact"
            placeholder="Select a contact"
            name="contact"
            options={contactOptions}
          />
          <div className="mb-80">
            <div className="flex justify-between">
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
