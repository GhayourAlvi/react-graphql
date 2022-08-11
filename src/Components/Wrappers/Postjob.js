
import '../../App.css';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import PostJobForm from '../Forms/PostJobForm';


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

function Jobs() {
  return (

    <div className="w-100">       
    <ApolloProvider client={client}>
     
      <PostJobForm/>
      
    </ApolloProvider>
    
    </div>
  );
}

export default Jobs;