import { useParams, useSearchParams, useLocation } from 'react-router-dom';

function CanvasDetail(props) {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  return (
    <div>
      <h1>CanvasDetail~</h1>
      <p>{id}</p>
      <p>{searchParams.get('keyword')}</p>
      <p>{location.hash}</p>
    </div>
  );
}

export default CanvasDetail;
