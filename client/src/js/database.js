import { openDB } from 'idb';

const initdb = async () =>
  openDB('hmc', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('hmc')) {
        console.log('hmc database already exists');
        return;
      }
      db.createObjectStore('hmc', { keyPath: 'id', autoIncrement: true });
      console.log('hmc database created');
    },
  });

// Method that takes some content and adds it to the IndexedDB database using the idb module
export const putDb = async (content) => {
  console.log('PUT to the database');
  const hmcDb = await openDB('hmc', 1);
  const tx = hmcDb.transaction('hmc', 'readwrite');
  const store = tx.objectStore('hmc');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};

// Method that gets content from the IndexedDB database using the idb module
export const getDb = async () => {
  console.log('GET from the database');
  const hmcDb = await openDB('hmc', 1);
  const tx = hmcDb.transaction('hmc', 'readonly');
  const store = tx.objectStore('hmc');
  const request = store.get(1);
  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');
  // Check if a variable is defined and if it is, return it. See MDN Docs on Optional Chaining (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
  return result?.value;
};

initdb();
