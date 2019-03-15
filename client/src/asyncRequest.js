import axios from "axios";

const request = (store, {
    url,
    method,
    params,
    body,
    mutationTypes
}) => {
    store.commit(mutationTypes.PENDING);
    if (method === "get") {
        axios.get(url, {
                params: params
            })
            .then(response => {
                store.commit(mutationTypes.SUCCESS, response.data)
            })
            .catch(() => {
                store.commit(mutationTypes.FAILURE)
            });
    } else {
        if (method === "post") {
            axios.post(url, body, {
                    params: params
                })
                .then(response => {
                    store.commit(mutationTypes.SUCCESS, response.data)
                })
                .catch(() => {
                    store.commit(mutationTypes.FAILURE)
                });
        }
    }
}

export default request;