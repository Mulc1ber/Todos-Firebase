import { forEach } from 'lodash';

export const useRequestSortTodos = (refreshTodos) => {
    const requestSortTodos = (sortTodos, listTodos, setListTodos) => {
        if (sortTodos) {
            refreshTodos();
            return;
        }

        console.log('listTodos in SORT', listTodos);
        const keysTodos = Object.keys(listTodos);
        keysTodos.sort((a, b) => {
            return listTodos[a].title.localeCompare(listTodos[b].title);
        });

        let sortedListTodos = {};

        keysTodos.forEach((key) => {
            sortedListTodos[key] = listTodos[key];
        });

        setListTodos(sortedListTodos);
    };

    return {
        requestSortTodos,
    };
};
