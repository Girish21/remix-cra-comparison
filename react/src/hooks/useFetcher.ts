import { useQuery } from "react-query";

type Args = {
  queryKeys: string[];
  url: string;
  method?: "post" | "get";
  headers?: HeadersInit | undefined;
};

type Returns<T> = {
  data: T;
  isLoading: boolean;
  isError: boolean;
};

const useFetcher = <T extends unknown>({
  queryKeys,
  url,
  method = "get",
  headers = {},
}: Args): Returns<T> => {
  const { data, isError, isLoading } = useQuery(
    queryKeys,
    async () => {
      const response = await fetch(url, {
        method,
        headers: new Headers({
          "Content-Type": "application/json",
          ...headers,
        }),
      });

      return response.json();
    },
    { staleTime: 10 * 1000 }
  );

  return { data: data as T, isError, isLoading };
};

export default useFetcher;
