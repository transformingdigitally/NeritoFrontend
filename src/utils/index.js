
export function isArrayWithLength(arr) {
    return (Array.isArray(arr) && arr.length)
}

export function getAllowedRoutes(routes) {
    const role = localStorage.getItem('userRole');

    return routes.filter(({ permission }) => {
        if (!permission) return true;
        else if (!isArrayWithLength(permission)) return true;
        else return (permission.indexOf(role) !== -1);
    });
}

export function isLoggedIn() {
    return !!(localStorage.getItem('accessToken'))
}

export function monthDiff(dateFrom, dateTo) {
    const data = dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()));
    return data;
}