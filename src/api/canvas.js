import { canvases } from './http';
import dayjs from 'dayjs';

export function getCanvases(params) {
  const pyload = Object.assign(
    {
      _sort: 'lastDay',
      _order: 'desc',
    },
    params,
  );
  return canvases.get('/', { params: pyload });
}

export function createCanvas() {
  const uuid = crypto.randomUUID();
  const dateFormat = dayjs().format('YYYY-MM-DD HH:mm:ss');
  const newCanvas = {
    title: uuid.substring(0, 4) + '_VR 가상 여행 서비스',
    lastDay: dateFormat,
    tag: '신규',
  };
  return canvases.post('/', newCanvas);
}
