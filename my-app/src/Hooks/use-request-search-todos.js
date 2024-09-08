import { filteredObjects } from '../utils/filtered';

export const useRequestSearchTodos = (refreshTodos) => {
    const requestSearchTodos = (searchValue, listTodos, setFilteredTasks) => {
        if (!searchValue) {
            refreshTodos();
            return;
        }

        const filtered = filteredObjects(listTodos, searchValue);
        setFilteredTasks(filtered);
    };

    return {
        requestSearchTodos,
    };
};
