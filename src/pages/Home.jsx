import { FaSearch, FaTh, FaList } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CanvasList from '../components/CanvasList';
import SearchBar from '../components/SearchBar';
import ListType from '../components/ListType';
import { getCanvases, createCanvas, deleteCanvas } from '../api/canvas';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Button from '../components/Button';
import useApiRequest from '../hooks/useApiRequest';

export default function Home() {
  const [searchText, setSearchText] = useState();
  const [isGridView, setIsGridView] = useState(true);
  const [data, setData] = useState([]);

  const { isLoading, error, excute: fetchData } = useApiRequest(getCanvases);
  const { isLoading: isLoadingCreate, excute: createNewCanvas } =
    useApiRequest(createCanvas);
  const { excute: delCanvas } = useApiRequest(deleteCanvas);
  useEffect(
    function () {
      fetchData(
        { title_like: searchText },
        {
          onSuccess: response => setData(response.data),
          onError: err => alert(err.message),
        },
      );
    },
    [searchText, fetchData],
  );

  // const handleDeleteItem = function (id) {
  //   const newItem = data.filter(item => item.id !== id);
  //   setData(newItem);
  // };

  const handleDeleteItem = async function (id) {
    // setNotes(notes.filter(note => note.id !== id));

    if (confirm('삭제 하시겠습니까?') === false) {
      return;
    }
    delCanvas(id, {
      onSuccess: response =>
        fetchData(
          { title_like: searchText },
          {
            onSuccess: response => setData(response.data),
            onError: err => alert(err.message),
          },
        ),
      onError: err => alert(err.message),
    });
  };

  const onHandleCreate = async () => {
    createNewCanvas(null, {
      onSuccess: response =>
        fetchData(
          { title_like: searchText },
          {
            onSuccess: response => setData(response.data),
            onError: err => alert(err.message),
          },
        ),
      onError: err => alert(err.message),
    });

    // try {
    //   setIsLoadingCreate(true);
    //   await new Promise(resolve => setTimeout(resolve, 1000));
    //   await createCanvas();
    //   fetchData({ title_like: searchText });
    // } catch (err) {
    //   alert(err.message);
    // } finally {
    //   setIsLoadingCreate(false);
    // }
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
      <div className="flex justify-end mb-6">
        <Button loading={isLoadingCreate} onClick={onHandleCreate}>
          등록하기
        </Button>
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
