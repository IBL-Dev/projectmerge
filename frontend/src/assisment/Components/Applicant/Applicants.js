import React, { useEffect, useState } from "react";
import axios from "axios";
import Applicant from "./Applicant";

function Applicants() {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get("http://localhost:5002/applicants");
        console.log("Fetched applicants:", response.data); // Debug log

        // Check if response.data is an array or if it's nested
        const applicantsData = Array.isArray(response.data)
          ? response.data
          : response.data.applicants || [];

        setApplicants(applicantsData);
      } catch (err) {
        console.error("Error fetching applicants:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {applicants.map((applicant) => (
        <Applicant key={applicant._id} applicant={applicant} />
      ))}
    </div>
  );
}

export default Applicants;
