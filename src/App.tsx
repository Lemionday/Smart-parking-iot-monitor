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
    Offcanvas,
    OffcanvasBody,
    OffcanvasHeader,
    Row,
    UncontrolledAlert,
} from "reactstrap"
import { CurrentUserTable } from "./components/User"
import { useViewModel } from "./viewmodel"

function App() {
    const { messageHistory, users, alert } = useViewModel()

    return (
        <div className="w-100 p-2 h-100">
            <Card outline className="w-100 h-100">
                <CardHeader tag="h2">Smart parking iot monitor</CardHeader>
                <CardBody>
                    <Row>
                        <Col>
                            <CurrentUserTable users={users} />
                            {alert === "" ? null : (
                                <UncontrolledAlert color="info">
                                    {alert}
                                </UncontrolledAlert>
                            )}
                        </Col>
                        <Col>
                            <HistoryList messages={messageHistory} />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
}

function HistoryList({ messages }: { messages: string[] }) {
    const [isShowHistory, setIsShowHistory] = useState(false)
    return (
        <>
            <Button
                color="primary"
                onClick={() => setIsShowHistory(!isShowHistory)}
                className="mb-2"
            >
                {" "}
                Notifications <Badge>{messages.length}</Badge>
            </Button>
            <Offcanvas
                placement="start"
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
        </>
    )
}

export default App
