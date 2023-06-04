# react-idealer-image

- shoutouts to the [original authors and contributors](https://github.com/stereobooster/react-ideal-image)
- please see the original repository for extended readme and documentation

## TLDR

- uses the bun runtime and is a complete refactor
- no support for legacy browsers
- framer-motion replaces react-waypoint

```sh
bun add github:noahehall/react-idealer-image
```

```ts
import { IdealImage } from "react-idealer-image";

const App = () => (
  <IdealImage
    motionProps={} /* see framer-motion docs */
    alt="ideal image"
    srcSet={[{ src: "some/image.webp" }]}
    width={'100%'}
  />
);
```
