// imports openDB from the idb package 
import { openDB } from 'idb';

// function for initializing the database
const initdb = async () =>
// calling openDB method
  openDB('jate', 1, {
    upgrade(db) {
      // if jate exists then return log
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // otherwise create object store jate
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Put to the database')
  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readwrite');
  // Open up the desired object store.
  const store = tx.objectStore('jate');
  // use the .put() method the store the content in object store, labelled as content
  const request = store.put({ content: content, id: 1});
// Get confirmation of the request. 
  const result = await request;

  console.log(`content added to database, ${result}`);
}
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result;
}

initdb();

