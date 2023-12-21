import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { User } from "../models/User"
import { Table } from "reactstrap"

const columnHelper = createColumnHelper<User>()

const columns = [
    columnHelper.accessor("uid", {
        header: "Mã thẻ",
        cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("goIn", {
        header: "Trạng thái",
        cell: (info) => (info.getValue() ? "Vào" : "Ra"),
    }),

    columnHelper.accessor("goInTS", {
        header: "Thời điểm xe vào bãi",
        cell: (info) => info.getValue().toDateString(),
    }),

    columnHelper.accessor("goOutTS", {
        header: "Thời điểm xe ra khỏi bãi",
        cell: (info) =>
            info.getValue() === undefined
                ? ""
                : info.getValue()!.toDateString(),
    }),

    columnHelper.accessor("totalCost", {
        header: "Tổng tiền gửi",
        cell: (info) => (info.getValue() === undefined ? "" : info.getValue()),
    }),
]

export function CurrentUserTable({ users }: { users: User[] }) {
    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Table bordered striped hover>
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        <th>#</th>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                          header.column.columnDef.header,
                                          header.getContext()
                                      )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        <th scope="row">{row.index + 1}</th>
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id}>
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}
