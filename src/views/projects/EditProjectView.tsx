import { getProjectById } from "@/api/ProjectAPI";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";


export default function EditProjectView() {

    const params = useParams();
    const projectId = params.projectId!;

    const { data, isLoading } = useQuery({
        queryKey: ['editProject', projectId],
        queryFn: () => {
            getProjectById(projectId)
        }
    });

    if (isLoading) return 'Cargando...'
    console.log(data)


    return (
        <div>EditProjectView</div>
    )
}
