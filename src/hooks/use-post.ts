import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Data {
    userId: number;
    id: number;
    title: string;
    body: string;
  }

export const usePost = (postId: number) => {
    return useQuery({
        queryFn: async () => {
          const { data } = await axios.get(
            `https://jsonplaceholder.typicode.com/posts/${postId}`
          );
          return data as Data;
        },
        onSuccess(data) {
            // 
        }, 
        onError(err) {
            //
        }, 
        cacheTime(){}, 

        // and many more, like refresh the page in onSuccess
      });
   
}