
export function saveToStor(id: number) {
    let inBookmarksIds = JSON.parse(localStorage.getItem('in_bookmark')) as Array<number>;

    if (!inBookmarksIds) {
        inBookmarksIds = [id];
    } else {
        inBookmarksIds.push(id);
    }
    localStorage.setItem('in_bookmark', JSON.stringify(inBookmarksIds));
}

export function removeFromStor(id: number) {
    let inBookmarksIds = JSON.parse(localStorage.getItem('in_bookmark')) as Array<number>;

    if (!inBookmarksIds) {
        return;
    } else {
        const objectIndexToUpdate = inBookmarksIds.findIndex((savedId) => savedId === id);
        inBookmarksIds.splice(objectIndexToUpdate, 1);
    }
    localStorage.setItem('in_bookmark', JSON.stringify(inBookmarksIds));
}

export function readFromStor() {
    return JSON.parse(localStorage.getItem('in_bookmark')) as Array<number> || [];
}