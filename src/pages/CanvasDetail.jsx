import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import CanvasTitle from '../components/CanvasTitle';

function CanvasDetail(props) {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  return (
    <div>
      <CanvasTitle />
    </div>
  );
}

export default CanvasDetail;
