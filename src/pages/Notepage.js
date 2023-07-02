
import React, { useState, useEffect } from 'react';
import Accordion from '../components/Accordion';
import axios from "axios";

import Modals from '../components/Modal';
import NoteForm from './Note';


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

  return (
    <div>
      <h1>Note App</h1>
      <Accordion items={notes} />
      <Modals/>
      <NoteForm/>
    </div>
  );
}

export default NoteApp;
