import { atom } from 'recoil';

export const myStateAtomID = atom({
  key: 'ID',
  default: '',
});

export const myStateAtomPW = atom({
    key: 'PW',
    default: '',
});

export const myStateAtomIndex = atom({
  key: 'Index',
  default: '',
});

export const myStateAtomGlobalID = atom({
  key: 'GlobalID',
  default: '',
});