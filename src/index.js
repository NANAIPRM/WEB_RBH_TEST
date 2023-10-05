import Home from './app/page.js';

export default function index(props) {
  return (
    <>
      <div>
        <Home data={props.data} />
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const data = await fetch(
    axios.get(`/api/todolist?offset=0&limit=10&sortBy=createdAt&isAsc=true&status=${status}`);
  ).then((response) => response.json());
  return {
    props: { data }
  };
};

isAsc: true,
    sortBy: "createdAt",
    page: page,
const makeApiCall = async (status, params) => {
    try {
      const response = await axios.get(`/api/todolist?offset=${params.page}&limit=10&sortBy=${params.sortBy}&isAsc=${params.isAsc}&status=${status}`);
      const data = response.data;

      setTotalPages(data.totalPages); // Set total pages

      if (params.page >= data.totalPages - 1) {
        setHasMore(false); // No more pages to load
      }

      setAllTodo(data);
      setTasks((prevTask) => [...prevTask, ...data.tasks]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
