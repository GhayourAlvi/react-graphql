import react, { useState, useEffect, useContext } from "react";
import "./App.css";
import PostJobForm from "./Components/Forms/PostJobForm";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

import { JobsContext } from "./Contexts/JobsContext";
import Container from "react-bootstrap/Container";
import { Router, Routes, Route } from "react-router-dom";
import Nav from "./Components/NavBar/Navbar";
import Jobs from "./Components/Wrappers/Jobs";
import Postjob from "./Components/Wrappers/Postjob"

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
});

function App() {
  
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState();
  const [commitmentId, setCommitmentId] = useState("cjtu8esth000z0824x00wtp1i");
  const [companyName, setCompanyName] = useState();
  const [locationName, setLocationName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [description, setDescription] = useState();
  const [applyUrl, setApplyUrl] = useState();

  return (
    <div className="w-100">
     
      <JobsContext.Provider
        value={{
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
        }}
      >
       
        <Container fluid>
          <Nav />
          <Container text>
            <Routes>
              <Route exact path="/" element={<Jobs />} />
              <Route exact path="/view" element={<Jobs/>} />
              <Route exact path="/post" element={<Postjob/>} />
            </Routes>
          </Container>
        </Container>
      
      </JobsContext.Provider>
    </div>
  );
}

export default App;
