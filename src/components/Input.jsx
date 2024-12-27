const Input = ({...props}) => {
  return (
    <div>
      <input {...props}
       className="h-[40px] w-full  rounded-md border border-brand/20 px-2 outline-green-500  ring-1 ring-brand/20 focus:outline-brand" />
    </div>
  );
};

export default Input;
