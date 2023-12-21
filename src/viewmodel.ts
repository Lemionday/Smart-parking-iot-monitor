import { useEffect, useState } from "react"
import useWebSocket from "react-use-websocket"
import { User } from "./models/User"

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
                        prev.map((user) =>
                            user.uid === updatedUser.uid ? updatedUser : user
                        )
                    )
                    break
                }
                case "bill": {
                    const { msg, updatedUser } = onShowBill(data as message)
                    setAlert(msg)
                    setMessageHistory((prev) => prev.concat(msg))
                    setUsers((prev) =>
                        prev.map((user) =>
                            user.uid === updatedUser.uid ? updatedUser : user
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
        alert,
    }
}

function onShowBill(data: message) {
    const msg = "Payment done with RFID tag: " + (data.data as User).uid

    const updatedUser = (data as message).data as User
    updatedUser.goInTS = new Date(updatedUser.goInTS)
    if (updatedUser.goOutTS !== undefined) {
        updatedUser.goOutTS = new Date(updatedUser.goOutTS)
    }

    return { msg, updatedUser }
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
