import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

const posts = [
  { id: 1, title: "post" },
  { id: 2, title: "post" },
  { id: 3, title: "post" },
  { id: 4, title: "post" },
  { id: 5, title: "post" },
  { id: 6, title: "post" },
];

// mock database fetch
const fetchPost = async (page: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return posts.slice((page - 1) * 2, page * 2);
};

export const InfiniteQueryComponent = () => {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["query"],
    async ({ pageParam = 1 }) => {
      const response = await fetchPost(pageParam);
      return response;
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: {
        pages: [posts.slice(0, 2)],
        pageParams: [1],
      },
    }
  );

  const lastPostRef = useRef<HTMLElement>();
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry.isIntersecting) fetchNextPage();
  }, [entry]);

  const _posts = data?.pages.flatMap((page) => page);

  return (
    <div>
      posts:
      {_posts?.map((post, i) => {
        if (i === _posts.length - 1)
          <div ref={ref} key={post.id} className="h-60 bg-white text-black">
            {post.title}
          </div>;
        return (
          <div key={post.id} className="h-60 bg-white text-black">
            {post.title}
          </div>
        );
      })}
      <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
        {isFetchingNextPage
          ? "Loading more..."
          : (data?.pages.length ?? 0) < 3
          ? "Load More"
          : "Nothing more to lead"}
      </button>
    </div>
  );
};
