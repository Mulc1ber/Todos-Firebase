import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';

export const useRequestGetTodos = () => {
    const requestGetTodos = (setListTodos, setIsLoading) => {
        const todosDbRef = ref(db, 'todos');

        return onValue(todosDbRef, (snapshot) => {
            const loadedTodos = snapshot.val() || {};

            setListTodos(loadedTodos);
            setIsLoading(false);
        });

        // setIsLoading(true);
        // fetch('http://localhost:3005/todos')
        //     .then((loadedData) => loadedData.json())
        //     .then((loadedTodos) => {
        //         setListTodos(loadedTodos);
        //     })
        //     .finally(() => setIsLoading(false));
    };

    return {
        requestGetTodos,
    };
};
