const Input = ({...props}) => {
  return (
    <div>
      <input {...props}
       className="h-[40px] w-full  rounded-md border border-gray-300 px-2 outline-none-green-500  ring-1 ring-gray-300 focus:outline-green-500" />
    </div>
  );
};

export default Input;
