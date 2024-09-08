import { useState } from 'react';
import { ref, push } from 'firebase/database'
import { db } from '../firebase'

export const useRequestAddTodo = () => {
    const [isCreating, setIsCreating] = useState(false);

    const requestAddTodo = (inputTodo, setInputTodo) => {
        if (!inputTodo) {
            console.log('Нечего добавлять');
            return;
        }

        setIsCreating(true);


        const createDbRef = ref(db, 'todos');

        push(createDbRef, {title: inputTodo})
            .then((response) => {
                console.log('Задача создана:', response);
            })
            .finally(() => {
                setIsCreating(false);
                setInputTodo('');
            });
    };

    return {
        isCreating,
        requestAddTodo,
    };
};
