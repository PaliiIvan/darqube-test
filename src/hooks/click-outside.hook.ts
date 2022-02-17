import React, { useEffect } from "react";
type useOutsideParams = {
    ref: React.RefObject<HTMLElement>;
    callback: () => void;
    isActive?: boolean
}
export const useOutsideClick = ({ callback, ref, isActive = true }: useOutsideParams) => {


    useEffect(() => {
        const handleClick = ({ target }: MouseEvent) => {

            if (ref.current && !ref.current.contains(target as Node)) {
                callback();
            }
        };

        if (isActive) {
            document.addEventListener('click', handleClick, { capture: true });
        }


        return () => document.removeEventListener('click', handleClick);
    }, [ref, callback, isActive]);
};