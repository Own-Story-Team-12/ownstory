import { atom } from 'recoil';

export const myStateAtomID = atom({
  key: 'ID',
  default: '',
});

export const myStateAtomPW = atom({
    key: 'PW',
    default: '',
});