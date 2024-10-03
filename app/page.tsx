import { inter } from "@/app/ui/fonts";
import Header from '@/app/ui/header';
import Footer from '@/app/ui/footer';
import Body from "@/app/ui/body";
import { polyfillPromiseWithResolvers } from "@/app/promisePolyfills";

polyfillPromiseWithResolvers();

// if (typeof Promise.withResolvers === "undefined") {
//   if (window) {
//     // @ts-expect-error This does not exist outside of polyfill which this is doing
//     window.Promise.withResolvers = function () {
//       let resolve, reject
//       const promise = new Promise((res, rej) => {
//         resolve = res
//         reject = rej
//       })
//       return { promise, resolve, reject }
//     }
//   } else {
//     // @ts-expect-error This does not exist outside of polyfill which this is doing
//     global.Promise.withResolvers = function () {
//       let resolve, reject
//       const promise = new Promise((res, rej) => {
//         resolve = res
//         reject = rej
//       })
//       return { promise, resolve, reject }
//     }
//   }
// }

export default function Home() {
  return (
    <div className={`w-full flex flex-col ${inter.className}`}>
      <main className="flex flex-col">
        <Header />
        <Body />
        <Footer />
      </main>
    </div>
  );
}
