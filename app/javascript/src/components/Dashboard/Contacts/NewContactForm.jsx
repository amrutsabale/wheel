import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { Input, Select, Switch } from "neetoui/formik";
import { Button, Label } from "neetoui";
import { departmentOptions } from "constants/contacts";

export default function NewContactForm({ onClose, refetch }) {
  const handleSubmit = () => {
    refetch();
    onClose();
  };
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        department: {},
        contactNumber: "",
        addedToBasecamp: false,
      }}
      onSubmit={handleSubmit}
      validationSchema={yup.object({
        name: yup.string().required("Name is required"),
        email: yup
          .string()
          .email("Invalid email format")
          .required("Email is required"),
        contactNumber: yup.string().required("Contact Number is required"),
      })}
    >
      {({ isSubmitting }) => (
        <Form>
          <Input label="Name" name="name" className="mb-6" />
          <Input label="Email" name="email" className="mb-6" />
          <Input label="Contact Number" name="contactNumber" className="mb-6" />
          <Select
            label="Department"
            placeholder="Select a department"
            name="department"
            options={departmentOptions}
            className="mb-6"
          />
          <div className="flex justify-between mb-6">
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
