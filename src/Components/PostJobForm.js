import React, { useContext } from "react";
import { Form, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../App.css";
import { JobsContext } from "../Contexts/JobsContext";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
    from,
  } from "@apollo/client";
  import { onError } from "@apollo/client/link/error";

function PostJobForm() {
  const {
    title,
    setTitle,
    commitmentId,
    setCommitmentId,
    companyName,
    setCompanyName,
    locationName,
    setLocationName,
    userEmail,
    setUserEmail,
    description,
    setDescription,
    applyUrl,
    setApplyUrl,
    jobs, setJobs
  } = useContext(JobsContext);

  const errorLink = onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
      graphqlErrors.map(({ message, location, path }) => {
        alert(`Graphql error ${message}`);
      });
    }
  });
  
  const link = from([
    errorLink,
    new HttpLink({ uri: "https://api.graphql.jobs/" }),
  ]);
  
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
  })

  const handleSubmit = () => {
    const job = {
      title,
      commitmentId,
      companyName,
      locationName,
      userEmail,
      description,
      applyUrl,
    };
  
    setJobs(job)
    console.warn({jobs})
  };

  return (
    <div className="postjob" >
        <h1> Post Job</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Job Title</Form.Label>
          <Form.Control
            type-="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></Form.Control>
        </Form.Group >
        <Form.Group className="mb-3">
          <Form.Label>Committment ID</Form.Label>
          <Form.Control
            type="text"
            value={commitmentId}
            onChange={(e) => setCommitmentId(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location Name</Form.Label>
          <Form.Control
            type="text"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>User Email</Form.Label>
          <Form.Control
            type="text"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description </Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Apply URL</Form.Label>
          <Form.Control
            type="text"
            value={applyUrl}
            onChange={(e) => setApplyUrl(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default PostJobForm;
