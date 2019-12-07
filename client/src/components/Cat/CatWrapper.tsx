import React, { useState, Fragment } from 'react';

import CatTable from './CatTable';
import CatCreate from './CatCreate';
import CatUpdate from './CatUpdate';
import { CatType } from '../../generated/graphql';
import CatContext from './context/catContext';
import { Link } from 'react-router-dom';

const CatWrapper = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentCat, setCurrentCat] = useState({} as Pick<CatType, 'id' | 'name' | 'age' | 'breed'>);
  const [currentCatId, setCurrentCatId] = useState('');

  return (
    <CatContext.Provider
      value={{
        isUpdate,
        setIsUpdate,
        currentCat,
        setCurrentCat,
        currentCatId,
        setCurrentCatId,
      }}
    >
      <div className="container">
        <div className="row my-3">
          <Link to="/">
            <h1>
              <span className="badge badge-light">My React App</span>
              <Link to="/graphql">
                <span style={{ fontSize: 'medium' }}>GraphQL Playground</span>
              </Link>
            </h1>
          </Link>
        </div>
        <div className="row py-3">
          <div className="col">
            {isUpdate ? (
              <Fragment>
                <h3>Edit Cat</h3>
                <CatUpdate />
              </Fragment>
            ) : (
              <Fragment>
                <h3>Add Cat</h3>
                <CatCreate />
              </Fragment>
            )}
          </div>
          <div className="col">
            <h3>My Cats</h3>
            <CatTable />
          </div>
        </div>
      </div>
    </CatContext.Provider>
  );
};

export default CatWrapper;
