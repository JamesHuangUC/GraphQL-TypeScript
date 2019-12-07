import React from 'react';
import { CatType } from '../../../generated/graphql';

const CatContext = React.createContext({
  isUpdate: false,
  setIsUpdate: (isUpdate: boolean) => {},
  currentCat: {} as Pick<CatType, 'id' | 'name' | 'age' | 'breed'>,
  setCurrentCat: (currentCat: Pick<CatType, 'id' | 'name' | 'age' | 'breed'>) => {},
  currentCatId: '',
  setCurrentCatId: (currentCatId: string) => {},
});

export default CatContext;
