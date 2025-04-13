import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { v4 as uuidv4 } from 'uuid';

interface Note {
  id: string;
  content: string;
}

const Cheatsheet = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const noteRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Load notes from localStorage on mount
  useEffect(() => {
    const storedNotes = localStorage.getItem('cheatsheetNotes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cheatsheetNotes', JSON.stringify(notes));
  }, [notes]);

  // Add a new note
  const handleAddNote = () => {
    if (newNote.trim()) {
      const note = { id: uuidv4(), content: newNote };
      setNotes([...notes, note]);
      setNewNote('');
    }
  };

  // Search and scroll to note
  const filteredNotes = notes.filter((note) =>
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (id: string) => {
    const noteElement = noteRefs.current[id];
    if (noteElement) {
      noteElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  const Cheatsheet = () => {
    return <h1>Hello from Cheatsheet!</h1>;
  };

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>Cheatsheet</title>
      </Helmet>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Development Cheatsheet
          </h1>

          {/* Add Note Form */}
          <div className="mb-8">
            <textarea
              className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Add a new note (e.g., 'JSX images: You can place an image like so <picture> or <img src> !notes:...')"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              onClick={handleAddNote}
            >
              Add Note
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Notes List */}
          <div className="space-y-4">
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note) => (
                <div
                  key={note.id}
                  ref={(el) => (noteRefs.current[note.id] = el)}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                  onClick={() => handleSearch(note.id)}
                >
                  <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                    {note.content}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                {searchQuery ? 'No matching notes found.' : 'No notes yet. Add one above!'}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cheatsheet;