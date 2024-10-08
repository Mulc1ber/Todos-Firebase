import { useState } from 'react';
import { ref, remove } from 'firebase/database';
import { db } from '../firebase';

export const useRequestDeleteTodo = (refreshTodos) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const requestDeteleTodo = (id) => {
        setIsDeleting(true);

        const delDbRef = ref(db, `todos/${id}`);

        remove(delDbRef)
            .then((response) => {
                console.log('Задача удалена:', response);
                refreshTodos();
            })
            .finally(() => {
                setIsDeleting(false);
            });
    };

    return {
        isDeleting,
        requestDeteleTodo,
    };
};
