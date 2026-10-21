import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductByIdActions } from "../actions/get-product-by-id.actions";
import { createUpdateProductAction } from "../actions/create-update-product.actions";

export const useProduct = (id: string) => {

    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['product', { id }],
        queryFn: () => getProductByIdActions(id),
        retry: false,
        staleTime: 1000 * 60 * 5, //5 minutos

    });

    const mutation = useMutation({
        mutationFn: createUpdateProductAction,
        onSuccess: (product) => {

            //Invalidar cache
            queryClient.invalidateQueries({
                queryKey: ['products']
            });
            queryClient.invalidateQueries({
                queryKey: ['product', { id: product.id }]
            });

            //Actualizar queryData
            queryClient.setQueryData(['products', { id: product.id }], product);
        },
    });

    // const handleSubmitForm = async (productLike: Partial<Product>) => {
    //     console.log({ productLike })
    // }

    return {
        ...query,
        mutation
    }
}
