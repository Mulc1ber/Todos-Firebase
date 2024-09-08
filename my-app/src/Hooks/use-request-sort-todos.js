export const useRequestSortTodos = (refreshTodos) => {
    const requestSortTodos = (sortTodos, listTodos, setListTodos) => {
        if (sortTodos) {
            refreshTodos();
            return;
        }

        // console.log(listTodos);
        console.log(Object.values(listTodos));


        // let sortedKeys = Object.values(listTodos).sort((a,b) => listTodos[a].title - listTodos[b].title)

        // let sorted = sortedKeys.reduce((accum, key) => {
        //     accum[key] = listTodos[key]
        //     return accum
        // }, {})

        // console.log(sorted);


        // console.log(listSort);

        // setListTodos(listSort)

        // fetch('http://localhost:3005/todos?_sort=title')
        //     .then((rawResponse) => rawResponse.json())
        //     .then((response) => {
        //         // console.log('Сортировка задач:', response);
        //         setListTodos(response);
        //     });
    };

    return {
        requestSortTodos,
    };
};
