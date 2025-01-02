import { Task } from "@/types/index"
import TaskCart from "./TaskCart"

type TaskListProps = {
    tasks: Task[]
}

type GroupedTasks = {
    [key: string]: Task[]
}

const initialStatusGroups: GroupedTasks = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: []
}

const statusTranslations : { [ key: string ] : string } = {
    pending: 'Pendiente',
    onHold: 'En espera',
    inProgress: 'En Progreso',
    underReview: 'En revisión',
    completed: 'Completado'
}

const statusStyles : { [ key: string ] : string } = {
    pending: 'border-t-slate-400',
    onHold: 'border-t-red-600',
    inProgress: 'border-t-sky-500',
    underReview: 'border-t-amber-300',
    completed: 'border-t-emerald-600'
}

export default function TaskList({ tasks }: TaskListProps) {

    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups);


    return (
        <>
            <h2 className="text-4xl font-black my-10">Tareas</h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32 justify-center '>
                {Object.entries(groupedTasks).map(([status, tasks]) => (
                    <div key={status} className='w-[250px] 2xl:min-w-0 2xl:w-1/5'>

                        <h3 className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 text-center ${statusStyles[status]}`}>{statusTranslations[status]}</h3>

                        <ul className='mt-5 space-y-5'>
                            {tasks.length === 0 ? (
                                <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                            ) : (
                                tasks.map(task => <TaskCart key={task._id} task={task} />)
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    )
}
