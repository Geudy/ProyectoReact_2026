function Loading() {
	return (
		<div className="flex flex-col items-center justify-center h-[60vh] w-full">
			{/* Spinner */}
			<div className="flex items-center justify-center mb-8">
				<span className="inline-block w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
			</div>
			{/* Skeleton header */}
			<div className="w-1/3 h-8 bg-gray-200 rounded mb-6 animate-pulse" />
			{/* Skeleton paragraph */}
			<div className="w-2/3 h-4 bg-gray-200 rounded mb-2 animate-pulse" />
			<div className="w-1/2 h-4 bg-gray-200 rounded mb-6 animate-pulse" />
			{/* Skeleton image */}
			<div className="w-[300px] h-[200px] bg-gray-200 rounded-lg animate-pulse mb-4" />
			{/* Skeleton button */}
			<div className="w-32 h-10 bg-gray-200 rounded-full animate-pulse" />
		</div>
	);
}

export default Loading;
