import React, { useState } from 'react';

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
  } from "reactstrap";
  // core components
  import DatePicker from "react-datepicker"; // Import DatePicker
  import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles
  import AppHeader from "components/Headers/AppHeader.js";
  
  const AppProfile = () => {
    const [selectedDate, setSelectedDate] = useState(null); 
    return (
      <>
        <AppHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Appointment Scheduling</h3>
                    </Col>
                    <Col className="text-right" xs="4">
          
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Patient information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Patient Id
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="lucky.jesse"
                              id="input-username"
                              placeholder="Username"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                      Appointment Information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                      <Col lg="4">
                      <FormGroup>
                      <label>Appointment Time</label>
                      <Input type="select" className="form-control-alternative">
                        <option>Select an option</option>
                        <option>3 PM</option>
                        <option>4 PM</option>
                        <option>5 PM</option>
                        <option>6 PM</option>
                        <option>7 PM</option>
                        <option>8 PM</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                          <label>Appointment Date</label>
                          <br />
                          <DatePicker
                            selected={selectedDate} // Pass the selected date to DatePicker
                            onChange={(date) => setSelectedDate(date)} // Update selectedDate state when date changes
                            className="form-control" // Apply Bootstrap form-control class
                          />
                    </FormGroup>
                    <FormGroup>
                      <label>Doctor Name:</label>
                      <Input type="select" className="form-control-alternative">
                        <option>Select an option</option>
                        <option>Habiba</option>
                        <option>Merna</option>
                        <option>Hazem</option>
                      </Input>
                    </FormGroup>
                    </Col>
                    </Row>
                    <Button
                        color="primary"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="lg" // Increase button size to large
                        className="float-right" // Align button to the left
                      >
                        Book
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  };
  
  export default AppProfile;
  