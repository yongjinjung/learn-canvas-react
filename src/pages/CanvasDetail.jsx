import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import CanvasTitle from '../components/CanvasTitle';
import LeanCanvas from '../components/LeanCanvas';
function CanvasDetail(props) {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  return (
    <div>
      <CanvasTitle />
      <LeanCanvas />
    </div>
  );
}

export default CanvasDetail;
