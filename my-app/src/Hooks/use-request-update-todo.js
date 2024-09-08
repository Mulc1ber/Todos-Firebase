import { ref, update } from 'firebase/database'
import { db } from '../firebase'

export const useRequestUpdateTodo = () => {
    const requestUpdateTodo = (id, updatedData) => {

        const updataDbRef = ref(db, `todos/${id}`);

        update(updataDbRef, {title: updatedData})
            .then((response) => {
                console.log('Обновление задачи:', response);
            });
    };

    return {
        requestUpdateTodo,
    };
};
