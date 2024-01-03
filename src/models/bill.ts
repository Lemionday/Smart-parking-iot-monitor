export type PaymentBill = {
    uid: string
    goInTS: Date
    goOutTS: Date
    duration: number
    totalCost: number
}

export const defaultBills: PaymentBill[] = [
    {
        uid: "B3AD9715",
        goInTS: new Date("2023-12-21T04:36:13.787Z"),
        goOutTS: new Date("2023-12-21T04:37:13.787Z"),
        duration: 60,
        totalCost: 1000,
    },
]
