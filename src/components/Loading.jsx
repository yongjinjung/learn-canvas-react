import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function Loading(props) {
  return (
    <div>
      <div>
        <AiOutlineLoading3Quarters className="animate-spin text-6xl text-blue-500 mx-auto mb-4" />
        <p>Loading data...</p>
      </div>
    </div>
  );
}

export default Loading;
