import { deleteNote } from "@/api/NoteAPI"
import { useAuth } from "@/hooks/useAuth"
import { Note } from "@/types/index"
import { formatDate } from "@/utils/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"

type NoteDetailProps = {
    note: Note
}

export default function NoteDetail({ note }: NoteDetailProps) {

    const { data, isLoading } = useAuth();
    const canDelete = useMemo(() => data?._id === note.createdBy._id, [data]);
    const params = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const queryClient = useQueryClient();

    const taskId = queryParams.get('viewTask')!;
    const projectId = params.projectId!;

    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['task', taskId] });
        }
    });

    if (isLoading) return 'Cargando...';

    return (
        <div className="p-3 flex justify-between items-center">
            <div>
                <p>
                    {note.content}
                </p>
                <p className="text-xs text-slate-500">
                    {note.createdBy.name}
                </p>
                <p className="text-xs text-slate-500">
                    {formatDate(note.createdAt)}
                </p>
            </div>
            {canDelete && (
                <button type="button" onClick={() => mutate({ projectId, taskId, noteId: note._id })} className="bg-red-400 hover:bg-red-500 p-2 text-white cursor-pointer transition-colors font-bold text-xs">Eliminar</button>
            )}
        </div>
    )
}
