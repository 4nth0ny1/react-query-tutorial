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
  const { data } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts/1"
      );
      return data as Data;
    },
  });

  return (
    <>
      <h1>React Query Tutorial Josh </h1>
      <div>{JSON.stringify(data)}</div>
    </>
  );
}

export default App;
