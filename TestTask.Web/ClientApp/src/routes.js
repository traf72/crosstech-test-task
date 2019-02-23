import { generatePath, matchPath } from 'react-router';

class Route {
    constructor(url, title) {
        this.url = url;
        this.title = title;
    }

    buildUrl(params) {
        if (!params) {
            return this.url;
        }

        return generatePath(this.url, params);
    }
}

export const isPathMatch = (path, route, options = { exact: true, strict: false }) => {
    const routeObj = {
        path: route,
        ...options
    };

    return matchPath(path, routeObj) != null;
}

export const home = new Route('/home', 'Сотрудники');
export const newEmployee = new Route('/new', 'Новый сотрудник');
export const editEmployee = new Route('/edit/:id(\\d+)', 'Редактировать сотрудника');
export const charts = new Route('/charts', 'Диаграммы');
export const signIn = new Route('/signin', '');
export const restricted = new Route('/restricted', '');

export const sidebarRoutes = {
    home,
    charts,
};

export const otherRoutes = {
    newEmployee,
    editEmployee,
    signIn,
    restricted,
};

const allRoutes = { ...sidebarRoutes, ...otherRoutes };

export default allRoutes;