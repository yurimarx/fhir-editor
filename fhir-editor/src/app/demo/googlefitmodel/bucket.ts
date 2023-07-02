import { Dataset } from "./dataset"

export interface Bucket {
    startTimeMillis: string
    endTimeMillis: string
    dataset: Dataset[]
}