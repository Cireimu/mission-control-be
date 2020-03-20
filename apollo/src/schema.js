const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    info: String!
    programs: [Program!]!
    products: [Product!]!
    projects: [Project!]!
    project(id: ID!): Project!
    statuses: [Status!]!
    status(id: ID!): Status!
    labels: [Label]
    label(id: ID!): Label
    persons: [Person!]!
    person(email: String!): Person!
    roles: [Role!]!
    role(id: ID!): Role!
    me: User!
    notes(orderBy: NoteOrderByInput, privatePerm: Boolean): [Note!]!
    note(id: ID!): Note!
    CodeClimateSnapshot(slug: String!): CodeClimateSnapshot
    CCRepos: [CCRepo]!
    CCRepo(id: ID!, name: String!): CCRepo!
    GithubRepos(search: String!, org: String): [GHRepo!]!
    SparkyBoy(owner: String!, name: String!): [Sparkline!]!
    SparkyDate(owner: String!, name: String!, until: String!): [Sparkline!]!
    GithubPulse(owner: String!, name: String!): Pulse!
  }

  type Mutation {
    createProgram(name: String!): Program!
    createProduct(name: String!, id: ID!): Product!
    createProject(name: String!, id: ID!): Project!
    createLabel(name: String!, color: String!, id: ID!): Label!
    createStatus(name: String!, projects: [String], id: ID!, labels: [String]): Status!
    updateLabel(id: ID!, name: String, color: String): Label!
    deleteLabel(id: ID!, columnId: String): Label!
    updateStatus(id: ID!, name: String!): Status!
    disconnectSelectedLabel(id: ID!, selected: ID!, columnId: String): Label!
    updateSelectedLabel(id: ID!, selected: ID!, columnId: String): Label!
    deleteStatus(id: ID!): Status!
    createPerson(name: String!, email: String!): Person!
    addProjectMember(id: ID!, email: String!): Person!
    createNote(
      topic: String!
      content: String!
      privateNote: Boolean
      attendedBy: [String!]!
      id: ID!
      rating: Int!
      notification: Boolean
    ): Note!
    updateNote(
      topic: String
      content: String
      privateNote: Boolean
      attendedBy: [String]
      oldAttendees: [String]
      id: ID!
      rating: Int
    ): Note!
    deleteNote(id: ID!): Note!
    addStatusToProject(id: ID!, name: String!): Project!
    addLabelToStatus(id: ID!, name: String!): Status!
    createGithubRepo(
      repoId: String!
      name: String!
      id: String!
      owner: String!
      ownerId: String!
    ): GHRepo!
  }

  type Program {
    id: ID!
    name: String!
    createdAt: String!
    updatedAt: String!
    products: [Product!]!
    statuses: [Status!]
  }

  type Product {
    id: ID!
    name: String!
    program: Program!
    createdAt: String!
    updatedAt: String!
    projects: [Project!]!
    productActive: Boolean
    CCRepos: [CCRepo]!
    grades: [CodeClimateSnapshot!]
  }

  type Project {
    id: ID!
    name: String!
    product: Product!
    projectManagers: [Person!]!
    team: [Person!]!
    notes(orderBy: NoteOrderByInput, privatePerm: Boolean): [Note]
    CCRepoIds: [String]
    createdAt: String!
    updatedAt: String!
    projectStatus: [Status]
    projectActive: Boolean
  }

  type Pulse {
    id: ID!
    issueCount: Int!
    closedIssues: Int!
    openIssues: Int!
    prCount: Int!
    closedPRs: Int!
    openPRs: Int!
    mergedPRs: Int!
  }

  type CCRepo {
    id: ID!
    name: String!
    CCId: String!
    product: Product!
  }

  type GHRepo {
    id: ID!
    name: String!
    owner: String!
    ownerId: String!
  }

  type Person {
    id: ID!
    name: String!
    email: String!
    role: Role!
    manages: [Project!]!
    notes: [Note]
    team: Project
    avatar: String
  }

  type User {
    id: ID!
    email: String!
    claims: [String!]!
    projects: [Project!]!
    role: Role!
  }

  type Note {
    id: ID!
    topic: String!
    content: String!
    author: Person!
    project: Project!
    attendedBy: [Person!]!
    createdAt: String!
    updatedAt: String!
    rating: Int!
    privateNote: Boolean!
  }

  type CodeClimateSnapshot {
    id: ID!
    grade: String!
    name: String!
    link: String!
  }

  type Label {
    id: ID!
    createdAt: String!
    updatedAt: String!
    name: String!
    color: String!
    status: Status!
    selected: [Project]
  }

  type Role {
    id: ID!
    name: String!
    privateNote: Boolean!
    viewProducts: Boolean!
  }

  type Sparkline {
    id: ID!
    message: String!
    additions: Int!
    deletions: Int!
    changedFiles: Int!
    committedDate: String!
  }

  enum NoteOrderByInput {
    id_ASC
    id_DESC
    topic_ASC
    topic_DESC
    content_ASC
    content_DESC
    rating_ASC
    rating_DESC
    createdAt_ASC
    createdAt_DESC
    updatedAt_ASC
    updatedAt_DESC
  }

  type Status {
    id: ID!
    createdAt: String!
    updatedAt: String!
    name: String!
    labels: [Label!]!
    projects: [Project!]
    program: Program
    display: Boolean!
  }
`;

module.exports = typeDefs;
