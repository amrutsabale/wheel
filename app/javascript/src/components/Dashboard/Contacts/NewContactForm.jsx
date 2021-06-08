import React from "react";
import { Formik, Form } from "formik";
import { Input, Select, Switch } from "neetoui/formik";
import { Button, Label } from "neetoui";
import {
  departmentOptions,
  contactFormInitialValues,
  contactFormValidationSchema,
} from "constants/contacts";

export default function NewContactForm({ onClose, refetch }) {
  const handleSubmit = () => {
    refetch();
    onClose();
  };
  return (
    <Formik
      initialValues={contactFormInitialValues}
      onSubmit={handleSubmit}
      validationSchema={contactFormValidationSchema}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          <Input label="Name" name="name" />
          <Input label="Email" name="email" />
          <Input label="Contact Number" name="contactNumber" />
          <Select
            label="Department"
            placeholder="Select a department"
            name="department"
            options={departmentOptions}
          />
          <div className="flex justify-between">
            <Label>Add to Basecamp</Label>
            <Switch name="addedToBasecamp" />
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
