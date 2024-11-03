import { Link } from 'react-router-dom';

function CanvasItem({ id, title, lastDay, tag }) {
  return (
    <Link
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
      to={`/canvases/${id}`}
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600 mb-4">최근 수정일: {lastDay}</p>
        <span className="inline-block px-3 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
          {tag}
        </span>
      </div>
    </Link>
  );
}

export default CanvasItem;
