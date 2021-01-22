import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import FormList from "./FormList/FormList";

const StyledForm = styled.div`
  form {
    width: 300px;
    margin: 0 auto;

    .group {
      display: grid;
      text-align: left;
    }
  }

  table,
  th,
  td {
    border: 1px solid black;
  }
  table.center {
    margin-left: auto;
    margin-right: auto;
  }
`;

const jobs = ["Raising funds", "Food supply", "Adoption promotion"];

function initialState() {
  return { volunteerName: "", hours: "", jobTitle: jobs[0] };
}

function Form() {
  const [form, setForm] = useState(initialState());
  const [forms, setForms] = useState([]);

  const { volunteerName, hours, jobTitle } = form;

  useEffect(() => {
    axios
      .get("http://localhost:3000/forms")
      .then((response) => {
        setForms(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [forms]);

  function updateField(key, event) {
    setForm({ ...form, [key]: event.target.value });
  }

  function resetForm() {
    setForm(initialState);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const { volunteerName, hours, jobTitle } = form;

    const newPost = {
      id: Math.floor(Math.random() * 100 + 1),
      volunteerName,
      hours: parseInt(hours),
      jobTitle,
    };

    axios
      .post("http://localhost:3000/forms", newPost)
      .then(() => {
        setForm({ ...newPost });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <StyledForm>
      <div className="post-form">
        <form>
          <div className="group">
            <label>Name:</label>
            <input
              id="volunteerName-input"
              name="volunteerName"
              type="text"
              value={volunteerName}
              onChange={(event) => updateField("volunteerName", event)}
            />
          </div>
          <div className="group">
            <label>Number of hours available per week:</label>
            <input
              id="hours-input"
              name="hours"
              type="number"
              value={hours}
              onChange={(event) => updateField("hours", event)}
            />
          </div>

          <div className="group">
            <label>Availability on one area:</label>
            <select
              id="job-input"
              name="jobTitle"
              value={jobTitle}
              onChange={(event) => updateField("jobTitle", event)}
            >
              {jobs.map((job, jobIndex) => (
                <option key={jobIndex} value={job}>
                  {job}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            id="submit-button"
            onClick={(event) => handleSubmit(event)}
          >
            Submit
          </button>
          <button type="button" id="reset-button" onClick={resetForm}>
            Reset
          </button>
        </form>
        <FormList forms={forms} />
      </div>
    </StyledForm>
  );
}

export default Form;
