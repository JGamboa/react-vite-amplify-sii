/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCompany = /* GraphQL */ `
  mutation CreateCompany(
    $condition: ModelCompanyConditionInput
    $input: CreateCompanyInput!
  ) {
    createCompany(condition: $condition, input: $input) {
      createdAt
      id
      identityCard
      name
      siiPassword
      updatedAt
      __typename
    }
  }
`;
export const deleteCompany = /* GraphQL */ `
  mutation DeleteCompany(
    $condition: ModelCompanyConditionInput
    $input: DeleteCompanyInput!
  ) {
    deleteCompany(condition: $condition, input: $input) {
      createdAt
      id
      identityCard
      name
      siiPassword
      updatedAt
      __typename
    }
  }
`;
export const updateCompany = /* GraphQL */ `
  mutation UpdateCompany(
    $condition: ModelCompanyConditionInput
    $input: UpdateCompanyInput!
  ) {
    updateCompany(condition: $condition, input: $input) {
      createdAt
      id
      identityCard
      name
      siiPassword
      updatedAt
      __typename
    }
  }
`;
