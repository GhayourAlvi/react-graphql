
import '../../App.css';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import ViewJobForm from '../Forms/ViewJobForm'


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

    <div>       
    <ApolloProvider client={client}>
     
      <ViewJobForm />
      
    </ApolloProvider>
    
    </div>
  );
}

export default Jobs;