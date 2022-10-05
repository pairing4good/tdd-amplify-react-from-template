import './App.css';
import React, { useState, useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { findAll, save, deleteById } from './NoteRepository';
import NoteForm from './NoteForm';
import NoteList from './NoteList';
import Header from './Header';
// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const fetchNotesCallback = async () => {
    const retrievedNotes = await findAll();
    if (retrievedNotes) setNotes(retrievedNotes);
    else setNotes([]);
  };

  const createNote = async () => {
    const newNote = await save(formData);
    const updatedNoteList = [...notes, newNote];
    setNotes(updatedNoteList);
  };

  const deleteNoteCallback = async (id) => {
    const newNotesArray = notes.filter((note) => note.id !== id);
    setNotes(newNotesArray);
    await deleteById(id);
  };

  useEffect(() => {
    fetchNotesCallback();
  }, []);

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="App">
          <Header signOut={signOut} user={user} />
          <NoteForm
            notes={notes}
            formData={formData}
            setFormDataCallback={setFormData}
            setNotesCallback={createNote}
          />
          <NoteList notes={notes} deleteNoteCallback={deleteNoteCallback} />
        </div>
      )}
    </Authenticator>
  );
}

export default App;
