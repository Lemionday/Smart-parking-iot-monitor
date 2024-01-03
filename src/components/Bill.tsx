import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Container,
    Row,
    Table,
} from "reactstrap"
import { PaymentBill } from "../models/bill"

export default function ParkingBill({
    bill,
    onPaymentDone,
}: {
    onPaymentDone: () => void
    bill: PaymentBill
}) {
    return (
        <Card id="payment-bill">
            <CardHeader>
                <Row>
                    <Col>
                        <p style={{ fontSize: 20 }}>
                            <strong>{`ID: #${Math.floor(
                                Math.random() * 1000
                            )}-${bill.uid.substring(0, 3)}`}</strong>
                        </p>
                    </Col>
                    <Col
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                        }}
                    >
                        <p>Smart parking Ltd</p>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                <Row className="text-center">
                    <h5
                        className="text-uppercase text-center mt-3"
                        style={{ fontSize: "4rem" }}
                    >
                        Parking Bill
                    </h5>
                    <Table>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>User go in time</td>
                                <td>{bill.goInTS.toDateString()}</td>
                            </tr>
                            <tr>
                                <td>User go out time</td>
                                <td>
                                    {bill.goOutTS === undefined
                                        ? ""
                                        : bill.goOutTS.toDateString()}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table>
                        <thead>
                            <tr>
                                <th> Type of fee</th>
                                <th>Ammounts</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Access</td>
                                <td>10 (¢)</td>
                            </tr>
                            <tr>
                                <td>Parking</td>
                                <td>{bill.duration} (¢)</td>
                            </tr>
                            <tr>
                                <td>Tax (15%)</td>
                                <td>{(bill.duration + 10) * 0.15} (¢)</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Container className="text-center">
                        Total:{" "}
                        {bill.duration + 10 + (bill.duration + 10) * 0.15}
                    </Container>
                </Row>
            </CardBody>
            <CardFooter>
                <Row className="justify-content-between">
                    <Col>
                        <p>Thank you for your purchase</p>
                    </Col>
                    <Col
                        style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                        <Button
                            className=" text-capitalize"
                            color="success"
                            onClick={onPaymentDone}
                        >
                            Payment Done
                        </Button>
                    </Col>
                </Row>
            </CardFooter>
        </Card>
    )
}
