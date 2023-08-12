import { useMutation, useQuery } from "@tanstack/react-query";
import "./App.css";
import axios from "axios";
import { usePost } from "./hooks/use-post";
import { InfiniteQueryComponent } from "../src/components/InfiniteQueryComponent";

// https://jsonplaceholder.typicode.com/posts

interface Data {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function App() {
  const { data, isLoading } = usePost(1);

  return (
    <>
      <h1>React Query Tutorial Josh </h1>
      <div>{isLoading ? "Content is Loading" : JSON.stringify(data)}</div>
      <hr></hr>
      <InfiniteQueryComponent />
    </>
  );
}

export default App;
