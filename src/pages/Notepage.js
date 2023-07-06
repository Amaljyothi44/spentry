
import React, { useState, useEffect } from 'react';
import Accordion from '../components/Accordion';
import axios from "axios";

import Modals from '../components/Modal';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://localhost:8000/"
});

function NoteApp() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await client.get('api/notes');
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
        
      }
    };

    fetchNotes();
  }, []);

  const addNote = (note) => {
    setNotes((prevNotes) => [...prevNotes, note]);
  };

  const handleNoteDelete = async (id) => {
    try {
      await client.delete(`api/notes/${id}`);
      
      const response = await client.get('api/notes');
      setNotes(response.data);
      console.log('Note deleted successfully');
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div>
      <h1>Note App</h1>
      <Accordion  items={notes} onDelete={handleNoteDelete} />
      <Modals addNote={addNote} />
    </div>
  );
}

export default NoteApp;
