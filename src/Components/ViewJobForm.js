import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_JOBS } from "../Graphql/Queries";
import "../App.css";
import Button from "react-bootstrap/Button";
function GetJobs() {
  const { error, loading, data } = useQuery(LOAD_JOBS);
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    if (data) {
      setJobs(data.jobs);
    }
  }, [data]);

  return (
    <div>
      <h1>Jobs</h1>
      <div className="item-container">
        {jobs.map((job) => (
          <div className="card">
            <h6> {job.title} </h6>
            <p> Company: {job.company.name}</p>
            <p> Email: {job.userEmail}</p>
            {/* <p> Description: {job.description}</p> */}

            <a href={job.applyUrl} target="_blank" rel="noreferrer">
              <Button>Apply Here</Button>
            </a>
          </div>
        ))}
      </div>
    </div>
    // <div>
    //      <h1>Jobs</h1>
    //   {" "}
    //   {jobs.map((val) => {
    //     return <h1> {val.title}</h1>;
    //   })}
    // </div>
  );
}

export default GetJobs;