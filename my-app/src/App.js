import { useState, useEffect } from 'react';
import { Todo } from './Components/Todo/Todo';
import { Button } from './Components/Button/Button';
import {
    useRequestGetTodos,
    useRequestAddTodo,
    useRequestDeleteTodo,
    useRequestSearchTodos,
    useRequestSortTodos,
} from './Hooks';
import styles from './App.module.css';
import { debounce } from 'lodash';
import { Input } from './Components/Input/Input';
import { filteredObjects } from './utils/filtered';

export const App = () => {
    const [listTodos, setListTodos] = useState({});
    const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [inputTodo, setInputTodo] = useState('');
    const [hasSort, setHasSort] = useState(false);

    const [searchValue, setSearchValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTasks, setFilteredTasks] = useState(listTodos);

    const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);

    const { requestGetTodos } = useRequestGetTodos();
    const { requestSearchTodos } = useRequestSearchTodos(refreshTodos);
    const { requestSortTodos } = useRequestSortTodos(refreshTodos);
    const { isCreating, requestAddTodo } = useRequestAddTodo(refreshTodos);
    const { isDeleting, requestDeteleTodo } = useRequestDeleteTodo(refreshTodos);

    useEffect(() => {
        if (searchValue.length > 0) {
            console.log('searchValue', searchValue);
            requestSearchTodos(searchValue, listTodos, setFilteredTasks);
        } else if (searchTerm.length > 0) {
            handleSearch(searchTerm);
        } else {
            requestGetTodos(setListTodos, setIsLoading);
        }
        if (hasSort) {
            setHasSort(!hasSort);
        }
    }, [refreshTodosFlag]);

    const handleSort = () => {
        requestSortTodos(hasSort, listTodos, setListTodos);
        setHasSort(!hasSort);
    };

    const handleSearch = debounce((searchTerm) => {
        const filtered = filteredObjects(listTodos, searchTerm);
        setFilteredTasks(filtered);
    }, 300);

    const handleChange = ({ target }) => {
        setSearchTerm(target.value);
        handleSearch(target.value);
    };

    const handleSearchValue = ({ target }) => {
        setSearchValue(target.value);
        requestSearchTodos(target.value, listTodos, setFilteredTasks);
    };

    return (
        <div className={styles.app}>
            <h1 className={styles.header}>Todos Firebase</h1>
            <div className={styles.todos}>
                <div className={styles.wrapPanel}>
                    <Input
                        type={'text'}
                        placeholder={'Новая задача'}
                        value={inputTodo}
                        onChange={({ target }) => setInputTodo(target.value)}
                        onKeyDown={(e) =>
                            e.key === 'Enter' ? requestAddTodo(inputTodo, setInputTodo) : null
                        }
                    />
                    <Button
                        onClick={() => requestAddTodo(inputTodo, setInputTodo)}
                        disabled={isCreating}
                    >
                        Добавить задачу
                    </Button>
                </div>

                <div className={styles.wrapPanel}>
                    <Input
                        type={'search'}
                        placeholder={'Поиск'}
                        value={searchValue}
                        onChange={handleSearchValue}
                    />
                    <Input
                        type={'search'}
                        placeholder={'Поиск с debounce'}
                        value={searchTerm}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <Button className={hasSort ? styles.active : ''} onClick={handleSort}>
                        Сортировать
                    </Button>
                </div>

                <div className={styles.listTodos}>
                    {isLoading ? (
                        <div className={styles.loader}></div>
                    ) : (
                        (searchTerm.length !== 0 || searchValue.length !== 0
                            ? Object.entries(filteredTasks)
                            : Object.entries(listTodos)
                        ).map(([id, { title }], index) => (
                            <Todo
                                key={id}
                                id={id}
                                title={title}
                                index={index}
                                isDeleting={isDeleting}
                                requestDeteleTodo={() => requestDeteleTodo(id)}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
