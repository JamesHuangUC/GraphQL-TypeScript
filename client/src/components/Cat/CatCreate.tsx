import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { GET_MY_CATS } from './CatTable';
import { GetCatsQuery, CreateCatMutationVariables, CreateCatMutation } from '../../generated/graphql';

const ADD_CAT = gql`
  mutation createCat($name: String!, $age: Int!, $breed: String!) {
    createCat(input: { name: $name, age: $age, breed: $breed }) {
      name
      id
      breed
      age
    }
  }
`;

const CatCreate: React.FC = () => {
  const [catInput, setCatInput] = useState({
    name: '',
    age: 0,
    breed: '',
  });

  const [addCat] = useMutation<CreateCatMutation, CreateCatMutationVariables>(ADD_CAT);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'age') {
      setCatInput({ ...catInput, [name]: Number(value) });
    } else {
      setCatInput({ ...catInput, [name]: value });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Add cat
    addCat({
      variables: { name: catInput.name, age: catInput.age, breed: catInput.breed },
      update(cache, { data }) {
        // Do not update cat if data is null
        if (!data) {
          return null;
        }
        // console.log(data);
        const getExistingCats = cache.readQuery<GetCatsQuery>({ query: GET_MY_CATS });
        // Add the new cat to the cache
        const existingCats = getExistingCats ? getExistingCats.cats : [];
        const newCat = data.createCat;
        cache.writeQuery<GetCatsQuery>({
          query: GET_MY_CATS,
          data: { cats: [...existingCats, newCat] },
        });
      },
    });
    // Reset input fields after submission
    setCatInput({
      name: '',
      age: 0,
      breed: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="catNameInput">Cat name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          id="catNameInput"
          required
          value={catInput.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="catAgeInput">Cat age</label>
        <input
          type="number"
          name="age"
          min="0"
          className="form-control"
          id="catAgeInput"
          required
          value={catInput.age}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="catBreedInput">Cat breed</label>
        <input
          type="text"
          name="breed"
          className="form-control"
          id="catBreedInput"
          required
          value={catInput.breed}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add a new cat
      </button>
    </form>
  );
};

export default CatCreate;
export { ADD_CAT };
