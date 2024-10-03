export type PromiseWithResolvers<T> = {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
};

export function polyfillPromiseWithResolvers() {
  if (!Promise.withResolvers) {
    Promise.withResolvers = function <T>(): PromiseWithResolvers<T> {
      let resolve: (value: T | PromiseLike<T>) => void;
      let reject: (reason?: unknown) => void;

      const promise = new Promise<T>((res, rej) => {
        resolve = res;
        reject = rej;
      });

      return { promise, resolve: resolve!, reject: reject! };
    };
  }
}


// if (typeof Promise.withResolvers === "undefined") {
//     if (window) {
//       // @ts-expect-error This does not exist outside of polyfill which this is doing
//       window.Promise.withResolvers = function () {
//         let resolve, reject
//         const promise = new Promise((res, rej) => {
//           resolve = res
//           reject = rej
//         })
//         return { promise, resolve, reject }
//       }
//     } else {
//       // @ts-expect-error This does not exist outside of polyfill which this is doing
//       global.Promise.withResolvers = function () {
//         let resolve, reject
//         const promise = new Promise((res, rej) => {
//           resolve = res
//           reject = rej
//         })
//         return { promise, resolve, reject }
//       }
//     }
//   }

//export default Promise;
