import { generatePath, matchPath } from 'react-router';

class Route {
    constructor(url, title, exact) {
        this.url = url;
        this.title = title;
        this.exact = exact;
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

export const home = new Route('/', 'Сотрудники', true);
export const employee = new Route('/employee', '');
export const newEmployee = new Route('/employee/new', 'Новый сотрудник');
export const editEmployee = new Route('/employee/edit/:id(\\d+)', 'Редактировать сотрудника');
export const charts = new Route('/charts', 'Диаграммы');
export const signIn = new Route('/signin', '');

export const sidebarRoutes = {
    home,
    charts,
};

export const otherRoutes = {
    employee,
    newEmployee,
    editEmployee,
    signIn,
};

const allRoutes = { ...sidebarRoutes, ...otherRoutes };

export default allRoutes;