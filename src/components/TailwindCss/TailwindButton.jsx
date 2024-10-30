function TailwindButton({ children, onClick }) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
      onClick={onclick}
    >
      {children}
    </button>
  );
}

export default TailwindButton;
