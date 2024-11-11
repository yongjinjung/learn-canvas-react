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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CategoryFilter from '../components/CategoryFilter';

export default function Home() {
  const [filter, setFilter] = useState({
    searchText: undefined,
    category: undefined,
  });
  const handleFilter = (key, value) =>
    setFilter({
      ...filter,
      [key]: value,
    });

  const [isGridView, setIsGridView] = useState(true);

  const queryClient = useQueryClient();
  // 1] 데이터 조회
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['canvases', filter.searchText, filter.category],
    queryFn: () =>
      getCanvases({ title_like: filter.searchText, tag: filter.category }),
    initialData: [],
  });

  // 2] 등록
  const { mutate: createNewCanvas, isLoading: isLoadingCreate } = useMutation({
    mutationFn: createCanvas,
    onSuccess: () => queryClient.invalidateQueries(['canvases']),
    onError: err => alert(err.message),
  });

  // 3] 삭제
  const { mutate: delCanvas } = useMutation({
    mutationFn: deleteCanvas,
    onSuccess: () => queryClient.invalidateQueries(['canvases']),
  });

  const handleDeleteItem = async function (id) {
    if (confirm('삭제 하시겠습니까?') === false) {
      return;
    }
    delCanvas(id);
  };

  const onHandleCreate = async () => {
    createNewCanvas();
  };

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row data-center justify-between">
        <div className="flex gap-2 flex-col w-full sm:flex-row mb-4 sm:mb-0">
          <SearchBar
            searchText={filter.searchText}
            onSearch={val => handleFilter('searchText', val)}
          />
          <CategoryFilter
            category={filter.category}
            onChange={val => handleFilter('category', val)}
          />
        </div>
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
          searchText={filter.searchText}
          isGridView={isGridView}
          onDeleteItem={handleDeleteItem}
        />
      )}
    </>
  );
}
