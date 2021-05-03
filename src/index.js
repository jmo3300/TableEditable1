import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Formik, Form, FieldArray } from "formik";
import Input from "./Input";
import Friends from "./Friends";
import "./styles.css";

const initialFormData = { firstName: "", friends: [] };

function App() {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    // this is replacement for a network call that would load the data from a server
    setTimeout(() => {
      setFormData({
        id: 1,
        firstName: "First Name 1",
        friends: [
          { id: 2, firstName: "First Name 2", lastName: "Last Name 2" },
          { id: 3, firstName: "First Name 3", lastName: "Last Name 3" }
        ]
      });
    }, 1000);
  });

  return (
    <div className="app">
      <Formik initialValues={formData} enableReinitialize>
        <Form>
          <Input name="firstName" label="Name: " />
          <FieldArray name="friends">
            {arrayHelpers => (
              <Friends
                name="friends"
                handleAdd={arrayHelpers.push}
                handleRemove={arrayHelpers.remove}
              />
            )}
          </FieldArray>
        </Form>
      </Formik>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
