const LoadingComponent = () => {
    return (
        <div className="flex items-center justify-center h-screen absolute top-0 left-0 right-0 bottom-0 w-full bg-[#f1f1f188]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-700"></div>
        </div>
    );
};

export default LoadingComponent;