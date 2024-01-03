import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { Table } from "reactstrap"
import { SlotStatus } from "../models/slotStatus"

const columnHelper = createColumnHelper<SlotStatus>()

const columns = [
    columnHelper.accessor("occupied", {
        header: "Slot Status",
        cell: (info) => (info.getValue() ? "Occupied" : "Empty"),
    }),
    columnHelper.accessor("changedTS", {
        header: "Last Changed At",
        cell: (info) =>
            info.getValue() !== undefined
                ? info.getValue()!.toLocaleString()
                : "Unknown",
    }),
]

export default function ParkingSlotStatus({
    slotStatus,
}: {
    slotStatus: SlotStatus[]
}) {
    const table = useReactTable({
        data: slotStatus,
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
