import { Link } from "react-router-dom";


export default function NotFound() {
    return (
        <>
            <h1 className="font-black text-4xl text-center text-white ">Página no encontrada</h1>
            <p className="mt-10 text-center text-white">
                Tal vez quieras volver a {' '}
                <Link to={'/'} className="text-fuchsia-500">Proyectos</Link>
            </p>
        </>
    )
}
