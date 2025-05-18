import './RefListing.module.scss';
import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
const baseUrl = 'https://swapi-node.vercel.app';
const initialUrl = baseUrl + '/api/people/';
// const initialUrl = 'https://swapi.dev/api/people/';
const fetchUrl = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

export const RefListing = () => {
  const { status, data, error, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['sw-people'],
      queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam as string),
      getNextPageParam: (lastPage) => {
        return lastPage.next ? baseUrl + lastPage.next : undefined;
      },
      initialPageParam: initialUrl
    });

  const allRows = data ? data.pages.flatMap((d) => d.results) : [];
  console.log({ data });
  console.log({ allRows });

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (lastItem.index >= allRows.length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allRows.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems()
  ]);

  return (
    <div>
      <p>
        This infinite scroll example uses React Query's useInfiniteScroll hook to fetch infinite
        data from a posts endpoint and then a rowVirtualizer is used along with a loader-row placed
        at the bottom of the list to trigger the next page to load.
      </p>

      <br />
      <br />

      {status === 'pending' ? (
        <p>Loading...</p>
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
        <div
          ref={parentRef}
          className="List"
          style={{
            height: `500px`,
            width: `100%`,
            overflow: 'auto'
          }}>
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative'
            }}>
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const isLoaderRow = virtualRow.index > allRows.length - 1;
              const post = allRows[virtualRow.index];
              console.log(post);

              return (
                <div
                  key={virtualRow.index}
                  className={virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven'}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`
                  }}>
                  {isLoaderRow
                    ? hasNextPage
                      ? 'Loading more...'
                      : 'Nothing more to load'
                    : JSON.stringify(post)}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div>{isFetching && !isFetchingNextPage ? 'Background Updating...' : null}</div>
      <br />
      <br />
    </div>
  );
};
