import React, { useEffect, useState, useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_JOBS } from "../../Graphql/Queries";
import '../../App.css';
import Button from "react-bootstrap/Button";
import { JobsContext } from "../../Context API/JobsContext";
import ClampLines from "react-clamp-lines";

function GetJobs() {

// ----------------------------------------------------------------------
// Loading jobs from graphql server
  const { error, loading, data } = useQuery(LOAD_JOBS);
  const [jobs, setJobs] = useState([]);

// ----------------------------------------------------------------------
  useEffect(() => {
    if (data) {
      setJobs(data.jobs);
    }
  }, [data]);



  return (
    <div className="viewjob">
      <h1>Available Jobs</h1>
      <div className="item-container">
        {jobs.map((job) => (
          <div className="card">
            <h6> {job.title} </h6>
            <p> Company: {job.company.name}</p>
            <p> Email: {job.userEmail}</p>
            <p> Job Description:</p>
            <ClampLines
              text={job.description}
              id={jobs.id}
              lines={2}
              moreText="Expand"
              lessText="Collapse"
              className="custom-class"
              ellipsis="_ _"
              innerElement="span" 
            />

            <a href={job.applyUrl} target="_blank" rel="noreferrer">
              <Button>Apply Here</Button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetJobs;
