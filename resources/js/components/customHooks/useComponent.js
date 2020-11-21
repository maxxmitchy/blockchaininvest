import React from "react";
import { useRouteMatch } from "react-router-dom";

function useComponent(name) {
    let { url } = useRouteMatch();

    const [component, setComponent] = React.useState({
        component: "",
        hide: "hide"
    });

    React.useEffect(() => {
        let link = url.replace(/\//g, "");
        let componentName = link[0].toUpperCase() + link.slice(1);
        name.map((x, e) => {
            if (x.type.name === componentName) {
                setComponent({
                    ...component,
                    component: name[e]
                });
            }
        });
    }, [url]);

    return component;
}

export default useComponent;
