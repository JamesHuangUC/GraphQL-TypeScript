import React, { useState, useEffect, useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { GET_MY_CATS } from './CatTable';
import { UpdateCatMutation, UpdateCatMutationVariables, GetCatsQuery, CatType } from '../../generated/graphql';
import CatContext from './context/catContext';

const UPDATE_CAT = gql`
  mutation updateCat($id: String!, $name: String, $age: Int, $breed: String) {
    updateCat(id: $id, cat: { name: $name, age: $age, breed: $breed }) {
      name
      id
      breed
      age
    }
  }
`;

const CatUpdate: React.FC = () => {
  const context = useContext(CatContext);
  const { currentCatId, currentCat, setIsUpdate } = context;

  const [catInput, setCatInput] = useState({
    name: currentCat.name,
    age: currentCat.age,
    breed: currentCat.breed,
  } as Partial<CatType>);

  useEffect(() => {
    setCatInput({
      name: currentCat.name,
      age: currentCat.age,
      breed: currentCat.breed,
    });
  }, [currentCatId, currentCat, setIsUpdate]);

  const [updateCat] = useMutation(UPDATE_CAT, {
    update(cache, { data }) {
      const existingCats = cache.readQuery<GetCatsQuery>({ query: GET_MY_CATS });
      const newCats = existingCats!.cats.map(c => {
        if (c.id === currentCat.id) {
          return { ...c, ...catInput };
        } else {
          return c;
        }
      });
      cache.writeQuery<GetCatsQuery>({
        query: GET_MY_CATS,
        data: { cats: newCats },
      });
    },
  });

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
    updateCat({
      variables: { id: currentCatId, name: catInput.name, age: catInput.age, breed: catInput.breed },
      optimisticResponse: {
        __typename: 'Mutation',
        updateCat: {
          __typename: 'CatType',
          id: currentCat.id,
          name: currentCat.name,
          age: currentCat.age,
          breed: currentCat.breed,
        },
      },
    });
    setIsUpdate(false);
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
      <button type="submit" className="btn btn-primary" style={{ marginRight: '10px' }}>
        Update
      </button>
      <button className="btn btn-secondary" onClick={() => setIsUpdate(false)}>
        Cancel
      </button>
    </form>
  );
};

export default CatUpdate;
export { UPDATE_CAT };
