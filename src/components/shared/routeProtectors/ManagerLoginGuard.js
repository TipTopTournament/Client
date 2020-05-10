import { Redirect } from "react-router-dom";

/**
 *
 * Another way to export directly your functional component.
 */
export const ManagerLoginGuard = props => {
    if (!localStorage.getItem("token")){
        return props.children;
    }
};

