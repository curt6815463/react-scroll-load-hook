# react-scroll-load-hook

## What is this

The package is similar to other react hook package like: [react-infinite-scroll-hook](https://www.npmjs.com/package/react-infinite-scroll-hook). But implemented by scroll event.

The hook only responsible for detecting the timing to do something (loadMore). You need to handle some status data by yourself, like whether the data is fetching(isLoading), is there has more data, etc.

## Implementation

Check the threshold position by your setting, such as use window or not, threshold value. Then, invoke the callback when scroll scrolled to the threshold position by detecting scroll events.

# Install

```
npm i react-scroll-load-hook
```

# Basic usage

```js
import useScrollLoad from "react-scroll-load-hook";
import useLoadList from "./useLoadList";

const ListPage = () => {
  // please handle the state data by yourself.
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
};
```

`ContainerRef` will be ignored if useWindow equals `true`.

```js
import useScrollLoad from "react-scroll-load-hook";
import useLoadList from "./useLoadList";

const ListPage = () => {
  // please handle the state data by yourself.
  const { listData, isLoading, loadMore, hasMore } = useLoadList();

  const { containerRef } = useScrollLoad({
    onLoadMore: loadMore,
    isLoading,
    hasMore,
    useWindow: true,
  });

  return (
    // the div is not the detector because useWindow: true.
    <div ref={containerRef}>
      {listData.map((value, index) => {
        //....
      })}
      {isLoading && <div> loading...</div>}
    </div>
  );
};
```

## Arguments

| Name       | Description                                                      | Type        | Optional | Default Value |
| ---------- | ---------------------------------------------------------------- | ----------- | -------- | ------------- |
| onLoadMore | Invoked when scroll detector reach the threshold position.       | function    | ❌       |               |
| hasMore    | If the list has more items to load.                              | boolean     | ❌       |               |
| isLoading  | Prevent invoke onLoadMore from checking if something is loading. | boolean     | ❌       |               |
| axis       | Vertial scroll or horizontal scroll. (`x`, `y`)                  | string      | ✅       | 'y'           |
| useWindow  | Use window as list scroller or DOM element                       | HTMLElement | ✅       | false         |
| threshold  | Range for adjusting the detection area.                          | Number      | ✅       | 100           |
