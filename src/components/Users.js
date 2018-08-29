import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {Link} from 'react-router-dom';

class Users extends Component {
  constructor() {
    super();

    this.state = {
      firstName: '',
      age: '',
      companyId: '',
    };
  }

  handleUpdate = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  }

  addUser = () => {
    this.props.mutate({
      variables: {
        firstName: this.state.firstName,
        age: +this.state.age,
        companyId: this.state.companyId
      },
      refetchQueries: [{ query: getUsers }],
    })
    this.setState({firstName: '', age: '', companyId: ''})
  }

  renderUsers(users) {
    return users.map(user => (
      <li key={user.id}>
        <Link to={`/users/${user.id}`}>
          {user.firstName}
        </Link>
      </li>));
  }


  render() {
    console.log(this.props);
    if (this.props.data.loading) return <div>Loading...</div>;

    return (
      <div>
        <input
          type="text"
          placeholder="name"
          value={this.state.firstName}
          name="firstName"
          onChange={this.handleUpdate}
        />
        <input type="text" placeholder="age" value={this.state.age} name="age" onChange={this.handleUpdate} />
        <input
          type="text"
          placeholder="company id"
          value={this.state.companyId}
          name="companyId"
          onChange={this.handleUpdate}
        />
        <button onClick={this.addUser}>Add</button>
        {this.renderUsers(this.props.data.users)}
      </div>
    );
  }
}

const getUsers = gql`
  {
    users {
      id
      firstName
    }
  }
`;

const addUser = gql`
mutation AddUser($firstName: String!, $age: Int!, $companyId: String) {
	addUser(firstName: $firstName, age: $age, companyId: $companyId) {
    firstName
    id
    company {
      name
    }
  }
}
`

export default graphql(addUser)(graphql(getUsers)(Users));
