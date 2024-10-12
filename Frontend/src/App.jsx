import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import "./App.css"


function App() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        const response = await axios.get('http://localhost:5000/api/notes');
        setNotes(response.data);
    };

    const addNote = async () => {
        const newNote = { title, content };
        await axios.post('http://localhost:5000/api/notes', newNote);
        fetchNotes(); // Refresh the notes
    };

    const deleteNote = async (id) => {
        await axios.delete(`http://localhost:5000/api/notes/${id}`);
        fetchNotes(); // Refresh the notes
    };

    return (
        <div className=" flex flex-col p-6 rounded-lg gap-4 mb-6 bg-white">
            <h1 className='text-3xl font-bold text-center'>Notes Manager</h1>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              
            />
            <TextField
              label="Content"
              variant="outlined"
              color="primary"
              margin="none"
              sizes="small"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              
            />
            <Button variant="contained" onClick={addNote}>
              ADD NOTE
            </Button>

            <ul className='flex flex-col gap-4'>
                {notes.map((note) => (
                    <li key={note._id} className='shadow-md bg-green-100 rounded-lg p-2 flex flex-col gap-2 items-start '>
                        <h2 className='text-lg font-bold'>{note.title}</h2>
                        <p>{note.content}</p>
                        <button onClick={() => deleteNote(note._id)} className="p-1 rounded-lg bg-blue-600 text-sm text-white">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
