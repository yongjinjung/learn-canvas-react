import { FaPlus } from 'react-icons/fa';
import Note from './Note';
import { useState } from 'react';

function CanvasCard({ title, isSubtitle = false, notes = [], onNotesChange }) {
  const handleAddNote = function (e) {
    const newNote = {
      id: crypto.randomUUID(),
      content: '',
      color: '',
    };
    onNotesChange([...notes, newNote]);
  };

  const handleRemoveNote = function (id) {
    console.log('handleRemoveNote : ', id);
    onNotesChange(notes?.filter(note => note.id !== id));
  };

  const handleUpdateNote = function (id, content, color) {
    onNotesChange(
      notes?.map(note => {
        return note.id === id ? { ...note, content, color } : note;
      }),
    );
  };

  return (
    <div className="row-span-1 bg-white min-h-48 border border-collapse border-gray-300">
      <div
        className={`${isSubtitle === false && 'bg-gray-100 border-b border-b-gray-300'} flex items-start justify-between px-3 py-2`}
      >
        <h3 className={`${isSubtitle === false && 'font-bold'}`}>{title}</h3>
        <button
          className="bg-blue-400  text-white p-1.5 text-xs rounded-md"
          onClick={handleAddNote}
        >
          <FaPlus />
        </button>
      </div>
      <div className="space-y-3 min-h-32 p-3">
        {notes?.map(note => (
          <Note
            key={note.id}
            id={note.id}
            content={note.content}
            color={note.color}
            onRemoveNote={handleRemoveNote}
            onUpdateNote={handleUpdateNote}
          />
        ))}
      </div>
    </div>
  );
}

export default CanvasCard;
