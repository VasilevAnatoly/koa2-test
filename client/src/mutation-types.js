const createAsyncMutation = type => ({
    SUCCESS: `${type}_SUCCESS`,
    FAILURE: `${type}_FAILURE`,
    PENDING: `${type}_PENDING`
});

export const GET_BOOKS_ASYNC = createAsyncMutation('GET_BOOKS');
export const POST_BOOK_ASYNC = createAsyncMutation('POST_BOOK');