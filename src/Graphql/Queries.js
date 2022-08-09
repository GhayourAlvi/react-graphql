import { gql } from "@apollo/client";

export const LOAD_JOBS = gql`
  query {
    jobs {
      id
      title
      company {
        name
      }
      userEmail
      description
      applyUrl
    }
  }
`;
