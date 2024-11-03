import CanvasItem from './CanvasItem';

function CanvasList({ filteredData, searchText, isGridView }) {
  if (filteredData === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-600">
          {searchText ? '검색 결과가 없습니다.' : '목록이 없습니다.'}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`grid gap-6 ${isGridView ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} `}
    >
      {filteredData.map(item => (
        <CanvasItem
          key={item.id}
          id={item.id}
          title={item.title}
          lastDay={item.lastDay}
          tag={item.tag}
        />
      ))}
    </div>
  );
}

export default CanvasList;
