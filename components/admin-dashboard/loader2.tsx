const LoadingAnimation: React.FC<{ h: string }> = ({ h }) => {
  return (
    <div>
      <div
        className={`flex items-center justify-center w-full ${h} max-h-full`}
      >
        <div className="animate-spin rounded-full h-full aspect-square border-t-[2px] border-b-[2px] border-blue-600"></div>
      </div>
      <div className="text-center mt-1"> loading...</div>
    </div>
  );
};

export default LoadingAnimation;
