import './App.css';
import React, { useState, useEffect } from 'react';
import localForage from 'localforage';
import NoteForm from './NoteForm';
import NoteList from './NoteList';
import Header from './Header';

function App() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const fetchNotesCallback = () => {
    localForage
      .getItem('notes')
      .then((savedNotes) => {
        if (savedNotes) return setNotes(savedNotes);
        return setNotes([]);
      })
      .catch((error) => {
        process.error('failed to setNotes', error.message);
      });
  };

  const createNote = () => {
    const updatedNoteList = [...notes, formData];
    setNotes(updatedNoteList);
    localForage.setItem('notes', updatedNoteList);
  };

  useEffect(() => {
    fetchNotesCallback();
  }, []);

  return (
    <div className="App">
      <Header />
      <NoteForm
        notes={notes}
        formData={formData}
        setFormDataCallback={setFormData}
        setNotesCallback={createNote}
      />
      <NoteList notes={notes} />
    </div>
  );
}

export default App;
