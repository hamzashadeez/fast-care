
const Button = ({label, ...props}) => {
    return (
        <div className="mt-2">
            <button {...props} className="bg-brand hover:bg-teal-700 text-white font-semibold h-[45px] w-full px-4 rounded-md">{label}</button>
        </div>
    )
}


export default Button;