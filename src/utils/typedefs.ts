export interface Note {
    title: string,
    dateAddedEpoch: Date | null,
    dateAdded: string,
    dueDate: string,
    text: string,
    modList: Array<string>,
    userId: string,
    id: string
}
