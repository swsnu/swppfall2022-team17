interface props {
  crowdedness: 0 | 1 | 2 | 3;
}

const Crowdedness = ({ crowdedness }: props) => {
  return (
    <div className="h-4 relative max-w-xl rounded-full overflow-hidden">
      {crowdedness == 0 && <div className="w-full h-full bg-gray-900 absolute" />}
      {crowdedness > 0 && (
        <>
          <div className="w-full h-full bg-gray-300 absolute" />
          {crowdedness == 1 && (
            <div className="transition-all ease-out duration-1000 h-full bg-green-500 relative w-1/3" />
          )}
          {crowdedness == 2 && (
            <div className="transition-all ease-out duration-1000 h-full bg-yellow-500 relative w-2/3" />
          )}
          {crowdedness == 3 && (
            <div className="transition-all ease-out duration-1000 h-full bg-red-600 relative w-full" />
          )}
        </>
      )}
    </div>
  );
};

export default Crowdedness;
