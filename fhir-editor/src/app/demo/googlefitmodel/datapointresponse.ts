import { InsertedDataPoint } from "./inserteddatapoint"

export interface DatapointResponse {
    nextPageToken: string
    deletedDataPoint: any[]
    dataSourceId: string
    insertedDataPoint: InsertedDataPoint[]
}