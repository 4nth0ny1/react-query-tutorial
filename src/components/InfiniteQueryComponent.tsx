import { useInfiniteQuery } from "@tanstack/react-query";

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
  return (
    <div>
      posts:
      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.map((post) => (
            <div key={post.id}>{post.title}</div>
          ))}
        </div>
      ))}
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
