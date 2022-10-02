import './App.css';
import React, { useState } from 'react';
import NoteForm from './NoteForm';

function App() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '' });
  return (
    <div className="App">
      <NoteForm
        notes={notes}
        formData={formData}
        setFormDataCallback={setFormData}
        setNotesCallback={setNotes}
      />
    </div>
  );
}

export default App;
