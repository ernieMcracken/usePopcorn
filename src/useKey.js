import { useEffect } from "react";

export function useKey(keyCode, action) {
  console.log("use key", keyCode);
  useEffect(
    function () {
      console.log("use key effect");
      function callback(ev) {
        if (ev.code.toLowerCase() === keyCode.toLowerCase()) {
          action();
        }
      }
      document.addEventListener("keydown", callback);

      return function () {
        console.log("clean up use key callback");
        document.removeEventListener("keydown", callback);
      };
    },
    [action, keyCode]
  );
}
