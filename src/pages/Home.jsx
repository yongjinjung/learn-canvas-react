import { FaSearch, FaTh, FaList } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import CanvasList from '../components/CanvasList';
import SearchBar from '../components/SearchBar';
import ListType from '../components/ListType';

export default function Home() {
  const [searchText, setSearchText] = useState('');
  const [isGridView, setIsGridView] = useState(true);
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

  const handleDeleteItem = function (id) {
    const newItem = items.filter(item => item.id !== id);
    setItems(newItem);
  };

  const filteredData = items.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <div className="containe mx-auto px-4 py-16">
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        <ListType isGridView={isGridView} setIsGridView={setIsGridView} />
      </div>
      <CanvasList
        filteredData={filteredData}
        searchText={searchText}
        isGridView={isGridView}
        onDeleteItem={handleDeleteItem}
      />
    </div>
  );
}
