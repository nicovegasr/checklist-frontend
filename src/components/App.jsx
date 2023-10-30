import '../assets/index.css';
import TaskList from './TaskList';
import { useInfiniteQuery } from '@tanstack/react-query';

const fetchTasks = async ({ pageParam = 0 }) => {
  const response = await fetch(`http://127.0.0.1:8080/tasks?pageNumber=${pageParam}`);
  if (response.ok === false) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json();
  return data
};

function App() {
  const query = useInfiniteQuery({
    queryKey: ['tasks'],
    queryFn: ({ pageParam = 0 }) => fetchTasks({pageParam}),
    getNextPageParam: (lastPage) => {
      if (lastPage.last === true) {
        return undefined;
      }
      return lastPage.pageable.pageNumber + 1;
    }
  });
  const tasks = query.data ? query.data.pages.flatMap((page) => page.content) : [];

  return (
    <div className="title">
      <h1>Task List</h1>
      <TaskList tasks={tasks} />
      {query.isError && <p>Something gone wrong...</p>}
      {query.isLoading && <p>Loading...</p>}
      {query.hasNextPage && (
        <button onClick={() => query.fetchNextPage()}>
          {query.isFetchingNextPage ? 'Loadings...' : 'Load more'}
        </button>
      )}
    </div>
  );
}

export default App;
