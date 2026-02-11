import { useQuery, useQueryClient } from "@tanstack/react-query"
import { queryKey } from "src/constants/queryKey"

const useFullWidth = (): [boolean, (fullWidth: boolean) => void] => {
    const queryClient = useQueryClient()

    const { data } = useQuery({
        queryKey: queryKey.fullWidth(),
        enabled: false,
        initialData: false,
    })

    const setFullWidth = (fullWidth: boolean) => {
        queryClient.setQueryData(queryKey.fullWidth(), fullWidth)
    }

    return [!!data, setFullWidth]
}

export default useFullWidth
