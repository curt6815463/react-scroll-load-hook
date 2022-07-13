# react-scroll-load-hook

The package is similar to other react hook package like: [react-infinite-scroll-hook](https://www.npmjs.com/package/react-infinite-scroll-hook), The reason I rewrite it is to make usage more flexible.

Here is the extension part.

1. In addition to using `DOM` element as a scroll detector, we can choose `window` as a detector
2. Can support horizontal scrolling or vertical scrolling
3. I also provide a reverse setting (reverseDirection), when you want to scroll in the opposite direction to load the data, like chat room.

# install

```
react-scroll-load-hook
```

# Usage

```js
const { listData, isLoading, loadMore, hasMore } = useLoadList();

const { containerRef } = useScrollLoad({
  onLoadMore: loadMore,
  isLoading,
  hasMore,
  useWindow: false,
});

return (
  <div ref={containerRef}>
    {listData.map((value, index) => {
      //....
    })}
    {isLoading && <div> loading...</div>}
  </div>
);
```
