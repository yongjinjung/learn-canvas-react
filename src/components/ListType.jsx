import { FaTh, FaList } from 'react-icons/fa';

function ListType({ isGridView, setIsGridView }) {
  return (
    <div className="flex space-x-2">
      <button
        className={`p-2 rounded-lg  focus:outline-none focus:ring-2
        focus:ring-blue-500  ${isGridView ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        aria-label="Grid View"
        onClick={() => setIsGridView(true)}
      >
        <FaTh />
      </button>
      <button
        className={`p-2 rounded-lg  focus:ring-2 focus:ring-blue-500 focus:outline-none ${!isGridView ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        aria-label="List view"
        onClick={() => setIsGridView(false)}
      >
        <FaList />
      </button>
    </div>
  );
}

export default ListType;
