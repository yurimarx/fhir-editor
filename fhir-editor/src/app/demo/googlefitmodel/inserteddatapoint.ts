import { Value } from "./value"

export interface InsertedDataPoint {
    startTimeNanos: string
    modifiedTimeMillis: string
    endTimeNanos: string
    value: Value[]
    dataTypeName: string
}