import { Person } from '../types';

const STORAGE_KEY = '/assets/data.json';

// Store person data in local storage
export const getStoredPersons = () => {
  const value = localStorage.getItem(STORAGE_KEY);

  if (!value) {
    return undefined;
  }

  try {
    const { persons } = JSON.parse(value);
    return persons as Person[];
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
    return undefined;
  }
};

// Get person data from local storage
export const setStoredPersons = (persons: Person[]) => {
  const timestamp = new Date().toISOString();
  const value = JSON.stringify({
    timestamp,
    persons,
  });

  localStorage.setItem(STORAGE_KEY, value);
};
