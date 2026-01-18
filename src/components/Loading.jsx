const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen text-3xl space-x-2 gap-5">
      loading
      <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce"></div>
      <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce delay-150"></div>
      <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce delay-300"></div>
    </div>
  );
};

export default Loading;
