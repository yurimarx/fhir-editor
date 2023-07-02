import { Value } from "./value"

export interface Point {
    startTimeNanos: string
    endTimeNanos: string
    dataTypeName: string
    originDataSourceId: string
    value: Value[]
}