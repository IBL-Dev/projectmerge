import axios from "axios";
import React, { useState, useEffect } from "react";

export default function AllStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    function getStudents() {
      axios
        .get("http://localhost:8070/student/")
        .then((res) => {
          setStudents(res.data); // Assuming res.data is an array of students
        })
        .catch((err) => {
          console.error("Error fetching students:", err);
        });
    }
    getStudents();
  }, []);

  return (
    <div>
      <h1>All Students</h1>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student._id}</td> {/* Adjust based on your API response */}
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
