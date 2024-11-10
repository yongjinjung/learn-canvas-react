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

export function deleteCanvas(id) {
  return canvases.delete(`/${id}`);
}

export async function getCanvasById(id) {
  const { data } = await canvases.get(`/${id}`);
  return data;
}

export async function updateTitle(id, title) {
  /**
   * post - 새로운 자원 생성
   * put - 기존 자원 전체 엉ㅂ데이트 또는 새 자원 생성
   * patch - 일부 수정
   */

  return canvases.patch(`${id}`, { title });
}

export async function updateCanvas(id, canvas) {
  await canvases.put(`/${id}`, canvas);
}
