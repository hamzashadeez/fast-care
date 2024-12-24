
const Button = ({label, ...props}) => {
    return (
        <div className="mt-2">
            <button {...props} className="bg-green-600 hover:bg-green-700 text-white font-semibold h-[45px] w-full px-4 rounded-md">{label}</button>
        </div>
    )
}


export default Button;