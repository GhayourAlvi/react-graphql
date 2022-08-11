import React, { useContext, useState } from "react";
import { Form, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../../App.css";
import { JobsContext } from "../../Context API/JobsContext";
import { CREATE_JOBPOST_MUTATION } from "../../Graphql/Mutations";
import Swal from "sweetalert2";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { useMutation } from "@apollo/client";
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
    jobs,
    setJobs,
  } = useContext(JobsContext);
  const [createJob, { error }] = useMutation(CREATE_JOBPOST_MUTATION);
  const [form, setForm] = useState();
  const [errors, setErrors] = useState({});

  // ----------------------------------------------------------------------
  // Error Link
  const errorLink = onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
      graphqlErrors.map(({ message, location, path }) => {
        alert(`Graphql error ${message}`);
      });
    }
  });

  // ----------------------------------------------------------------------
  // Link to the server
  const link = from([
    errorLink,
    new HttpLink({ uri: "https://api.graphql.jobs/" }),
  ]);

  // ----------------------------------------------------------------------
  //creating apollo clinet
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
  });

  // ----------------------------------------------------------------------
  //Submiting form for posting job
  const handleSubmit = async (e) => {
    e.preventDefault();

    //catch errors
    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      // got errors!
      setErrors(newErrors);
    } else {
      // No errors!  making request to server!

      const res = await createJob({
        variables: {
          title: title,
          commitmentId: commitmentId,
          companyName: companyName,
          locationNames: locationName,
          userEmail: userEmail,
          description: description,
          applyUrl: applyUrl,
        },
      });

      if (res) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Job has been successfully posted",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      if (error) {
        console.log(error);
      }

      //clear all fields of the form
      setTitle("");
      setApplyUrl("");
      setCompanyName("");
      setDescription("");
      setLocationName("");
      setUserEmail("");
      setErrors("")
    }
  };

  // ----------------------------------------------------------------------
  // Define errors for validation
  const findFormErrors = () => {
    const newErrors = {};
    // title errors
    if (!title || title === "") newErrors.title = "Please enter title!";
    // commitmentId errors
    if (!commitmentId || commitmentId === "")
      newErrors.commitmentId = "Please enter commitmentId ";
    // companyName errors
    if (!companyName || companyName === "")
      newErrors.companyName = "Please enter company name";
    // locationName errors
    if (!locationName || locationName === "")
      newErrors.locationName = "Please enter location name";
    // userEmail  errors
    if (!userEmail || userEmail === "")
      newErrors.userEmail = "Please enter user email";
    // description  errors
    if (!description || description === "")
      newErrors.description = "Please enter description";
    // applyUrl errors
    if (!applyUrl || applyUrl === "") newErrors.applyUrl = "Please enter URL";

    return newErrors;
  };

  return (
    <div className="postjob">
      <h1> Post Job</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Job Title</Form.Label>
          <Form.Control
            type-="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Fullstack Engineer"
            isInvalid={!!errors.title}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.title}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Committment ID</Form.Label>
          <Form.Control
            type="text"
            value={commitmentId}
            onChange={(e) => setCommitmentId(e.target.value)}
            isInvalid={!!errors.commitmentId}
          />
          <Form.Control.Feedback type="invalid">
            {errors.commitmentId}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Trimulabs"
            isInvalid={!!errors.companyName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.companyName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location Name</Form.Label>
          <Form.Control
            type="text"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            placeholder="Lahore"
            isInvalid={!!errors.locationName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.locationName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>User Email</Form.Label>
          <Form.Control
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="dev@trimulabs.com"
            isInvalid={!!errors.userEmail}
          />
          <Form.Control.Feedback type="invalid">
            {errors.userEmail}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description </Form.Label>
          <Form.Control
            as="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add details here..."
            isInvalid={!!errors.description}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Apply URL</Form.Label>
          <Form.Control
            type="text"
            value={applyUrl}
            onChange={(e) => setApplyUrl(e.target.value)}
            placeholder="trimulabs.com"
            isInvalid={!!errors.applyUrl}
          />
          <Form.Control.Feedback type="invalid">
            {errors.applyUrl}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default PostJobForm;
