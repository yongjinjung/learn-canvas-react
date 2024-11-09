import { FaSearch, FaTh, FaList } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CanvasList from '../components/CanvasList';
import SearchBar from '../components/SearchBar';
import ListType from '../components/ListType';
import { getCanvases } from '../api/canvas';
import Loading from '../components/Loading';
import Error from '../components/Error';

export default function Home() {
  const [searchText, setSearchText] = useState();
  const [isGridView, setIsGridView] = useState(true);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData(params) {
    // const data = await fetch('http://localhost:8000/canvases')
    //   .then(res => res.json())
    //   .catch(error => console.log(error));

    // const response = await axios.get('http://localhost:8000/canvases');
    try {
      setIsLoading(true);
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const canvasesPromise = getCanvases(params);
      const response = await canvasesPromise;
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(
    function () {
      fetchData({ title_like: searchText });
    },
    [searchText],
  );

  const handleDeleteItem = function (id) {
    const newItem = data.filter(item => item.id !== id);
    setData(newItem);
  };

  // const filteredData = data.filter(item =>
  //   item.title.toLowerCase().includes(searchText.toLowerCase()),
  // );

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row data-center justify-between">
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        <ListType isGridView={isGridView} setIsGridView={setIsGridView} />
      </div>
      {isLoading && <Loading />}
      {error && (
        <Error
          errMsg={error.message}
          onRetry={() => fetchData({ title_like: searchText })}
        />
      )}
      {!isLoading && !error && (
        <CanvasList
          filteredData={data}
          searchText={searchText}
          isGridView={isGridView}
          onDeleteItem={handleDeleteItem}
        />
      )}
    </>
  );
}
