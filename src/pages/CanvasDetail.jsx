import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import CanvasTitle from '../components/CanvasTitle';
import LeanCanvas from '../components/LeanCanvas';
import { getCanvasById, updateTitle } from '../api/canvas';
import { useState, useEffect } from 'react';

function CanvasDetail(props) {
  const { id } = useParams();
  const [canvas, setCanvas] = useState({});

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const fetchCanvas = async () => {
      const data = await getCanvasById(id);
      setCanvas(data);
    };

    fetchCanvas();
  }, [id]);

  const handleTitleChange = async title => {
    try {
      await updateTitle(id, title);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      {JSON.stringify(canvas)}
      <CanvasTitle title={canvas?.title} onChange={handleTitleChange} />
      <LeanCanvas />
    </div>
  );
}

export default CanvasDetail;
