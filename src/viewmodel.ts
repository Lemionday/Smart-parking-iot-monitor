import { useEffect, useState } from "react"
import useWebSocket from "react-use-websocket"
import { User } from "./models/User"
import { SlotStatus } from "./models/slotStatus"
import { PaymentBill } from "./models/bill"

type message = {
    type: string
    data: unknown
}
const SOCKET_URL = "ws://localhost:8080/ws"

export function useViewModel() {
    const [messageHistory, setMessageHistory] = useState<string[]>([])

    const { sendJsonMessage, lastJsonMessage } = useWebSocket(SOCKET_URL)

    const [users, setUsers] = useState<User[]>([])
    const [alert, setAlert] = useState<string>("")
    const [slotStatuses, setSlotStatuses] = useState<SlotStatus[]>(() => [
        { slotId: "1", occupied: false },
        { slotId: "2", occupied: false },
        { slotId: "3", occupied: false },
    ])

    const [bill, setBill] = useState<PaymentBill>()
    const [isWaitingForPayment, setIsWaitingForPayment] =
        useState<boolean>(false)

    function onPaymentDone() {
        sendJsonMessage({ type: "payment-done", data: { uid: bill!.uid } })
        setIsWaitingForPayment(false)
    }

    useEffect(() => {
        if (lastJsonMessage !== undefined) {
            const data = lastJsonMessage
            if (data === null) {
                console.log("data null")
                return
            }

            switch ((data as message).type) {
                case "user-go-in": {
                    const { msg, user } = onUserGoIn(data as message)
                    setAlert(msg)
                    setMessageHistory((prev) => prev.concat(msg))
                    setUsers((prev) => prev.concat(user))
                    break
                }
                case "user-go-out": {
                    const { msg, updatedUser } = onUserGoOut(data as message)
                    setAlert(msg)
                    setMessageHistory((prev) => prev.concat(msg))
                    setUsers((prev) =>
                        prev.map((user) => {
                            if (user.uid === updatedUser.uid) {
                                updatedUser.goInTS = new Date(user.goInTS)
                                return updatedUser
                            }

                            return user
                        })
                    )
                    break
                }
                case "bill": {
                    const { msg, bill } = onShowBill(data as message)
                    setAlert(msg)
                    setMessageHistory((prev) => prev.concat(msg))
                    setBill(bill)
                    setIsWaitingForPayment(true)
                    break
                }
                case "slot-status-change": {
                    const { msg, updatedSlot } = onSlotStatusChange(
                        data as message
                    )
                    setAlert(msg)
                    setMessageHistory((prev) => prev.concat(msg))
                    setSlotStatuses((prev) =>
                        prev.map((slot) =>
                            slot.slotId === updatedSlot.slotId
                                ? updatedSlot
                                : slot
                        )
                    )
                    break
                }
                default:
                    console.log("unknown message type")
            }
        }
    }, [lastJsonMessage, setMessageHistory])

    return {
        messageHistory,
        users,
        slotStatuses,
        alert,
        bill,
        isWaitingForPayment,
        onPaymentDone,
    }
}

function onSlotStatusChange(data: message) {
    const msg = "Slot status changed: " + (data.data as SlotStatus).slotId

    const updatedSlot = (data as message).data as SlotStatus
    if (updatedSlot.changedTS !== undefined) {
        updatedSlot.changedTS = new Date(updatedSlot.changedTS)
    }

    return { msg, updatedSlot }
}

function onShowBill(data: message) {
    const msg = "Show bill for RFID tag: " + (data.data as PaymentBill).uid

    const bill = (data as message).data as PaymentBill
    bill.goInTS = new Date(bill.goInTS)
    bill.goOutTS = new Date(bill.goOutTS)

    return { msg, bill }
}

function onUserGoOut(data: message) {
    const msg =
        "New user go out with RFID tag: " + ((data as message).data as User).uid

    const updatedUser = (data as message).data as User
    updatedUser.goInTS = new Date(updatedUser.goInTS)
    if (updatedUser.goOutTS !== undefined) {
        updatedUser.goOutTS = new Date(updatedUser.goOutTS)
    }

    return { msg, updatedUser }
}

function onUserGoIn(data: message) {
    const msg =
        "New user go in with RFID tag: " + ((data as message).data as User).uid

    const user = (data as message).data as User
    user.goInTS = new Date(user.goInTS)

    return { msg, user }
}
