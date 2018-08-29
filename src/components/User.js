import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class User extends Component {
  render() {
    if (this.props.data.loading) return <div>Loading...</div>;

    return (
      <div>
        {this.props.data.user.firstName}, {this.props.data.user.company.name}
      </div>
    );
  }
}

const getUser = gql`
  query GetUser($id: String!) {
    user(id: $id) {
      firstName
      age
      company {
        name
      }
    }
  }
`;

export default graphql(getUser, {
  options: props => ({ variables: { id: props.match.params.id } }),
})(User);
