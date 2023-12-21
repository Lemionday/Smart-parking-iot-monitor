export type User = {
    uid: string;
    goIn: boolean;
    goInTS: Date;
    goOutTS?: Date;
    totalCost?: number;
};

export const defaultUsers: User[] = [
    {
        goIn: true,
        uid: "B3AD9715",
        goInTS: new Date("2023-12-21T04:36:13.787Z"),
    },
];
