import { useState, useRef, useEffect } from 'react';
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';

const Note = ({
  id,
  content = '',
  color: initalColor,
  onRemoveNote,
  onUpdateNote,
}) => {
  const colorOptions = [
    'bg-yellow-300',
    'bg-pink-300',
    'bg-blue-300',
    'bg-green-300',
  ];

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectColor, setselectColor] = useState(() => {
    if (initalColor) return initalColor;
    const colorNumber = Math.floor(Math.random() * colorOptions.length);
    return colorOptions[colorNumber];
  });

  const handleColorChange = e => {
    setselectColor(e.target.dataset.color);
  };

  const textareaRef = useRef(null);
  const [textareaContent, setTextareaContent] = useState(content);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';
    }
  }, [textareaContent, content]);

  const handleContentUpdate = () => {
    setIsEditMode(false);
    onUpdateNote(id, textareaContent, selectColor);
  };

  return (
    <div
      className={`p-4 ${selectColor} relative max-h-[32rem] overflow-hidden`}
    >
      <div className="absolute top-0.5 right-1">
        {isEditMode == true ? (
          <button
            aria-label="Close Note"
            className="text-gray-700"
            onClick={handleContentUpdate}
          >
            <AiOutlineCheck size={20} />
          </button>
        ) : (
          <button
            aria-label="Close Note"
            className="text-gray-700"
            onClick={() => onRemoveNote(id)}
          >
            <AiOutlineClose size={20} />
          </button>
        )}
      </div>
      <textarea
        ref={textareaRef}
        className={`w-full h-full bg-transparent resize-none border-none focus:outline-none text-gray-900 overflow-hidden`}
        aria-label="Edit note"
        placeholder="메모를 작성하세요."
        style={{ height: 'auto', minHeight: '8rem' }}
        onChange={e => {
          setIsEditMode(true);
          setTextareaContent(e.target.value);
        }}
        value={textareaContent}
      />
      {isEditMode && (
        <div className="flex space-x-1.5">
          {colorOptions.map((option, index) => (
            <button
              key={index}
              className={`w-6 h-6 rounded-full cursor-pointer outline outline-gray-50 ${option}`}
              aria-label={`Change color to ${option}`}
              data-color={option}
              onClick={handleColorChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Note;
