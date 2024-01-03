import { useState } from "react"
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    ListGroup,
    ListGroupItem,
    Modal,
    Offcanvas,
    OffcanvasBody,
    OffcanvasHeader,
    Row,
    UncontrolledAlert,
} from "reactstrap"
import ParkingBill from "./components/Bill"
import ParkingSlotStatus from "./components/ParkingSlotStatus"
import { CurrentUserTable } from "./components/User"
import { useViewModel } from "./viewmodel"

function App() {
    const {
        messageHistory,
        users,
        slotStatuses,
        bill,
        alert,
        isWaitingForPayment,
        onPaymentDone,
    } = useViewModel()
    const [isShowHistory, setIsShowHistory] = useState(false)

    return (
        <div className="w-100 p-2 h-100">
            <Card outline className="w-100 h-100">
                <CardHeader tag="h2">Smart parking iot monitor</CardHeader>
                <CardBody>
                    <Row>
                        <Col>
                            <ShowNotificationButton
                                setIsShowHistory={setIsShowHistory}
                                numberNotification={messageHistory.length}
                            />
                            <CurrentUserTable users={users} />
                            {alert === "" ? null : (
                                <UncontrolledAlert color="info">
                                    {alert}
                                </UncontrolledAlert>
                            )}
                        </Col>
                        <Col>
                            <ParkingSlotStatus slotStatus={slotStatuses} />
                        </Col>
                    </Row>
                    <NotificationList
                        isShowHistory={isShowHistory}
                        setIsShowHistory={setIsShowHistory}
                        messages={messageHistory}
                    />
                    <Modal isOpen={isWaitingForPayment} centered>
                        <ParkingBill
                            bill={bill!}
                            onPaymentDone={onPaymentDone}
                        />
                    </Modal>
                </CardBody>
            </Card>
        </div>
    )
}

function ShowNotificationButton({
    setIsShowHistory,
    numberNotification,
}: {
    setIsShowHistory: React.Dispatch<React.SetStateAction<boolean>>
    numberNotification: number
}) {
    return (
        <Button
            color="primary"
            onClick={() => setIsShowHistory(true)}
            className="mb-2"
        >
            {" "}
            Notifications <Badge>{numberNotification}</Badge>
        </Button>
    )
}

function NotificationList({
    isShowHistory,
    setIsShowHistory,
    messages,
}: {
    isShowHistory: boolean
    setIsShowHistory: React.Dispatch<React.SetStateAction<boolean>>
    messages: string[]
}) {
    return (
        <Offcanvas
            direction="end"
            isOpen={isShowHistory}
            toggle={() => setIsShowHistory(!isShowHistory)}
        >
            <OffcanvasHeader className="text-center">
                Notifications
            </OffcanvasHeader>
            <OffcanvasBody>
                <ListGroup numbered>
                    {messages.map((message, idx) => (
                        <ListGroupItem key={idx}>{message}</ListGroupItem>
                    ))}
                </ListGroup>
            </OffcanvasBody>
        </Offcanvas>
    )
}

export default App
