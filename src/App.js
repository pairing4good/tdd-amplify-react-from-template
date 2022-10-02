import './App.css';
import React, { useState, useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { findAll, save } from './NoteRepository';
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
    const updatedNoteList = [...notes, formData];
    setNotes(updatedNoteList);
    await save(formData);
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
          <NoteList notes={notes} />
        </div>
      )}
    </Authenticator>
  );
}

export default App;
