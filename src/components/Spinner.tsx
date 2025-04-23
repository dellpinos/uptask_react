
export default function Spinner() {
    return (
        <div className="w-100 h-screen bg-gray-800 flex flex-col justify-center gap-5">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <h3 className=" font-bold text-white text-center text-xl ">Cargando . . .</h3>
        </div>
    )
}
