import { Timestamp } from "firebase/firestore";

export interface Note {
    dateAdded: string,
    dateAddedEpoch: Timestamp | null,
    dueDate: string,
    modList: Array<string>,
    text: string,
    title: string,
    userId: string
}
