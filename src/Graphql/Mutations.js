import { gql } from "@apollo/client";

export const CREATE_JOBPOST_MUTATION = gql`
mutation{
    postJob(input: {
      title: "Developer",
      commitmentId: "cjtu8esth000z0824x00wtp1i",
      companyName: {
        name: "Demo Company"
      },
      locationNames: "Lahore",
      userEmail: "demo@gmail.com",
      description: "This is demo role",
      applyUrl: "https://googl.com"
    })
    {
      id
      title
      slug
      locationNames
      company{
        name
      }
      userEmail
      description
      applyUrl
    }
  }
`;