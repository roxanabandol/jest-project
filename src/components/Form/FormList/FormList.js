import React from "react";

const FormList = ({ forms }) => (
  <table className="center">
    <thead>
      <tr>
        <th>Name</th>
        <th>Hours available</th>
        <th>Job</th>
      </tr>
    </thead>
    <tbody>
      {(forms || []).map((form, formIndex) => (
        <tr key={formIndex}>
          <td>{form.volunteerName}</td>
          <td>{form.hours}</td>
          <td>{form.jobTitle}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default FormList;
