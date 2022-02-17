import { useLocation } from "react-router-dom";

export const useCurrentPageName = () => {
    const location = useLocation();

    return location.pathname.split('/')[1];
};