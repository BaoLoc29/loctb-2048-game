import { useEffect } from "react";

export default function useEvent(even, handler, passive = false) {
    useEffect(() => {
        window.addEventListener(even, handler, passive);

        return function cleanUp() {
            window.removeEventListener(even, handler, passive);
        }
    });
}