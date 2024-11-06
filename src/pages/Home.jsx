import { FaSearch, FaTh, FaList } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CanvasList from '../components/CanvasList';
import SearchBar from '../components/SearchBar';
import ListType from '../components/ListType';
import { getCanvases } from '../api/canvas';

export default function Home() {
  const [searchText, setSearchText] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [data, setData] = useState([]);

  async function fetchData(params) {
    // const data = await fetch('http://localhost:8000/canvases')
    //   .then(res => res.json())
    //   .catch(error => console.log(error));

    // const response = await axios.get('http://localhost:8000/canvases');
    const response = await getCanvases();
    setData(response.data);
  }

  useEffect(function () {
    fetchData();
  }, []);

  const handleDeleteItem = function (id) {
    const newItem = data.filter(item => item.id !== id);
    setData(newItem);
  };

  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <div className="containe mx-auto px-4 py-16">
      <div className="mb-6 flex flex-col sm:flex-row data-center justify-between">
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
