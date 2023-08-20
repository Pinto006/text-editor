import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // console.error('putDb not implemented');
  const indexDb = await openDB('jate', 1);
  console.log("putDb before transaction")
const tx = indexDb.transaction('jate', 'readwrite');
console.log("putDb after transaction")
const store = tx.objectStore('jate');
const request = store.put({ id:1, value: content }); 
const result = await request;
console.log('result.value', result);
return result?.value;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => { 
  // console.error('getDb not implemented');
const indexDb = await openDB('jate', 1);
console.log("getDb before transaction")
const tx = indexDb.transaction('jate', 'readonly');
console.log("getDb after transaction")
const store = tx.objectStore('jate');
const request = store.get(1);
const result = await request;
console.log('result.value', result);
return result?.value;
};

initdb();
