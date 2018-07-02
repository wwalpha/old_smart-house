import { firebaseDb } from './firebase';

export const push = (key: string, value: any) => new Promise((resolve, reject) => {
  firebaseDb.ref(key).push(value, error => (error ? reject(error) : resolve()));
});

export const set = (key: string, value: any) => new Promise((resolve, reject) => {
  firebaseDb.ref(key).set(value, error => (error ? reject(error) : resolve()));
});

export const remove = (key: string, value: any) => new Promise((resolve, reject) => {
  firebaseDb.ref(key).remove(error => (error ? reject(error) : resolve()));
});

export const update = (key: string, value: any) => new Promise((resolve, reject) => {
  firebaseDb.ref(key).update(value, error => (error ? reject(error) : resolve()));
});
