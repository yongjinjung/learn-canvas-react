import { Link } from 'react-router-dom';
import { FaSearch, FaTh, FaList } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function Home() {
  const [searchText, setSearchText] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [isListView, setIsListView] = useState(false);
  const [isSearchCount, setIsSearchCount] = useState(false);
  const [items, setItems] = useState([
    {
      id: 1,
      title: '친환경 도시 농업 플랫폼',
      lastDay: '2023-06-15',
      tag: '농업',
    },
    {
      id: 2,
      title: 'AI 기반 건강 관리 앱',
      lastDay: '2023-06-15',
      tag: '헬스케어',
    },
    {
      id: 3,
      title: '온디맨드 물류 서비스',
      lastDay: '2023-06-15',
      tag: '물류',
    },
    { id: 4, title: 'VR 가상 여행 서비스', lastDay: '2023-06-15', tag: '여행' },
    { id: 5, title: 'AI 플랫폼', lastDay: '2023-06-15', tag: 'IT' },
  ]);

  useEffect(() => {
    if (items.length > 0) {
      setIsListView(false);
    } else {
      setIsListView(true);
    }
  }, [items]);

  const filteredData = items.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <div className="containe mx-auto px-4 py-16">
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
          <input
            type="text"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            placeholder="검색"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400"></FaSearch>
        </div>
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
      </div>
      {items.length == 0 && (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">목록이 없습니다.</p>
        </div>
      )}

      {filteredData.length == 0 && (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">검색 결과가 없습니다.</p>
        </div>
      )}

      {filteredData.length > 0 && (
        <div
          className={`grid gap-6 ${isGridView ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} `}
        >
          {filteredData.map(item => (
            <Link
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
              to={`/canvases/${item.id}`}
              key={item.id}
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  최근 수정일: {item.lastDay}
                </p>
                <span className="inline-block px-3 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
                  {item.tag}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
