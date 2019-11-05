import React, { useContext } from 'react';
import { CatType, DeleteCatMutationFn, GetCatsQuery } from '../../generated/graphql';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { GET_MY_CATS } from './CatTable';
import CatContext from './context/catContext';

const DELETE_CAT = gql`
  mutation deleteCat($id: String!) {
    deleteCat(id: $id) {
      id
      name
      age
      breed
    }
  }
`;

interface Props {
  index: number;
  cat: Partial<CatType>;
}

const CatDetail: React.FC<Props> = ({ index, cat }) => {
  const context = useContext(CatContext);
  const { setIsUpdate, setCurrentCat, setCurrentCatId } = context;

  const [deleteCat] = useMutation<DeleteCatMutationFn>(DELETE_CAT, {
    update(cache, { data }) {
      const existingCats = cache.readQuery<GetCatsQuery>({ query: GET_MY_CATS });
      const newCats = existingCats!.cats.filter(c => c.id !== cat.id);
      cache.writeQuery<GetCatsQuery>({
        query: GET_MY_CATS,
        data: { cats: newCats },
      });
    },
  });

  const handleDeleteCat = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    deleteCat({
      variables: { id: cat.id },
    });
    setIsUpdate(false);
  };

  const handleUpdateCat = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setIsUpdate(true);
    setCurrentCat(cat);
    cat.id && setCurrentCatId(cat.id);
  };

  return (
    <tr key={index}>
      <td>{cat.name}</td>
      <td>{cat.age}</td>
      <td>{cat.breed}</td>
      <td>
        <button
          className="btn btn-outline-dark"
          onClick={event => handleUpdateCat(event)}
          style={{ marginRight: '10px' }}
        >
          Edit
        </button>

        <button className="btn btn-outline-dark" onClick={event => handleDeleteCat(event)}>
          Remove
        </button>
      </td>
    </tr>
  );
};

export default CatDetail;
export { DELETE_CAT };
