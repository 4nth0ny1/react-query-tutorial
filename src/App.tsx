import { useQuery } from "@tanstack/react-query";
import "./App.css";
import axios from "axios";

// https://jsonplaceholder.typicode.com/posts

interface Data {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function App() {
  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      await wait(2000);
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts/1"
      );
      return data as Data;
    },
  });

  return (
    <>
      <h1>React Query Tutorial Josh </h1>
      <div>{isLoading ? "Content is Loading" : JSON.stringify(data)}</div>
    </>
  );
}

export default App;
