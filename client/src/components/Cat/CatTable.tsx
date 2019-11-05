import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import CatDetail from './CatDetail';

import { CatType, GetCatsQuery } from '../../generated/graphql';

const GET_MY_CATS = gql`
  query getCats {
    cats {
      id
      name
      breed
      age
    }
  }
`;

const CatTable: React.FC = () => {
  const { loading, error, data } = useQuery<GetCatsQuery>(GET_MY_CATS);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error || !data) {
    return <div>Error...</div>;
  }

  let cats = data.cats;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Breed</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {cats.length > 0 ? (
          cats.map((cat: Partial<CatType>, index: number) => <CatDetail key={index} index={index} cat={cat} />)
        ) : (
          <tr>
            <td colSpan={4}>No cats...</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CatTable;
export { GET_MY_CATS };
