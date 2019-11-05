import React from 'react';
import { CatType } from '../../../generated/graphql';

const CatContext = React.createContext({
  isUpdate: false,
  setIsUpdate: (isUpdate: boolean) => {},
  currentCat: {} as Partial<CatType>,
  setCurrentCat: (currentCat: Partial<CatType>) => {},
  currentCatId: '',
  setCurrentCatId: (currentCatId: string) => {},
});

export default CatContext;
