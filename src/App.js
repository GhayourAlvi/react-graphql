import react, {useState, useEffect, useContext} from 'react';
import './App.css';
import PostJobForm from './Components/PostJobForm';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import ViewJobForm from './Components/ViewJobForm'
import {JobsContext} from "./Contexts/JobsContext"

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
  
  const [jobs, setJobs] = useState();
  const [title, setTitle] = useState();
  const [commitmentId, setCommitmentId] = useState("cjtu8esth000z0824x00wtp1i");
  const [companyName, setCompanyName] = useState();
  const [locationName, setLocationName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [description, setDescription] = useState();
  const [applyUrl, setApplyUrl] = useState();
   
  return (

    <div>
      <JobsContext.Provider value={
         {title, setTitle,
         commitmentId, setCommitmentId,
          companyName, setCompanyName, 
          locationName, setLocationName, 
          userEmail, setUserEmail,
          description, setDescription,
          applyUrl, setApplyUrl,
          jobs, setJobs
         }
        }>
      <PostJobForm/>
      </JobsContext.Provider>
       {/* <ApolloProvider client={client}>
     
      <ViewJobForm />
      
    </ApolloProvider> */}
    
    </div>
  );
}

export default App;
