import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import AppHeader from "components/Headers/AppHeader.js";
//lesa 3yzen nzwd en a7na na5od mn patient id w nt2kd eno mwgod fe dataset
//w en id dr yb2 3la 7sb service 
//w en payment tb2 3la 7sb service

const AppProfile = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("4");
  const [time, setTime] = useState(""); 
  const [serviceId, setServiceId] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [status, setStatus] = useState("pending");

  const handleBooking = async () => {
    try {
      if (!selectedDate || !patientId || !doctorId || !time || !serviceId || !paymentAmount) {
        console.error('Please fill all fields');
        alert('Please fill all fields');
        return;
      }

      const existingAppointmentsResponse = await axios.get('http://localhost:5001/api/v1/appointments');

      // Check if response data is available
      if (!existingAppointmentsResponse || !existingAppointmentsResponse.data || !existingAppointmentsResponse.data.data) {
        console.error('No existing appointments found');
        return;
      }
      
      // Extract existing appointments data
      const existingAppointmentsData = existingAppointmentsResponse.data.data;
      
      // Ensure existingAppointmentsData has appointments array
      if (!existingAppointmentsData.hasOwnProperty('appointments')) {
        console.error('Existing appointments data does not have an appointments array');
        return;
      }
      
      // Ensure existingAppointmentsData.appointments is an array
      const existingAppointments = existingAppointmentsData.appointments;
      if (!Array.isArray(existingAppointments)) {
        console.error('Existing appointments data is not in an array format');
        return;
      }
      
      // Check if appointments exist
      if (existingAppointments.length === 0) {
        console.error('No existing appointments found');
        return;
      }
      
      // Format the selected date as "MM/DD/YYYY"
      const formattedDate = selectedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
      
      // Check if there's already an appointment with the same date, time, and service
      const conflictingAppointment = existingAppointments.find(Appointment => {
        return Appointment.serviceId === serviceId && Appointment.time === time && Appointment.date === formattedDate ;
      });

      
      if (conflictingAppointment) {
        // There's a conflicting appointment
        alert('This time slot is already reserved. Please choose another time.');
        return;
      }

      // If no conflicting appointment or user changed the time, proceed to book the appointment
      const appointmentData = {
        patientId,
        doctorId,
        serviceId,
        date: formattedDate,
        time,
        status,
        payment: {
          amount: paymentAmount
        }
      };

      const bookingResponse = await axios.post('http://localhost:5001/api/v1/appointments', appointmentData);
      console.log('Appointment booked successfully:', bookingResponse.data);

      // Display success message to the user
      alert('Appointment booked successfully');

      // Reset form fields after successful booking
      setPatientId('');
      setDoctorId('4');
      setTime(''); 
      setSelectedDate(null);
      setServiceId('');
      setPaymentAmount('');
      setStatus('pending');
    } catch (error) {
      console.error('Error booking appointment:', error.response.data);
      // Display error message to the user
      alert('Error booking appointment');
    }
  };

  return (
    <>
      <AppHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Appointment Scheduling</h3>
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
                          <label className="form-control-label" htmlFor="input-username">
                            Patient Id
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            id="input-username"
                            placeholder="Username"
                            type="text"
                            onChange={(e) => setPatientId(e.target.value)}
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
                          <Input
                            type="select"
                            className="form-control-alternative"
                            onChange={(e) => setTime(e.target.value)}
                          >
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
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            className="form-control"
                          />
                        </FormGroup>
                        <FormGroup>
                          <label>Service</label>
                          <Input
                            type="text"
                            className="form-control-alternative"
                            onChange={(e) => setServiceId(e.target.value)}
                          />
                        </FormGroup>
                        <FormGroup>
                          <label>Payment Amount</label>
                          <Input
                            type="number"
                            className="form-control-alternative"
                            onChange={(e) => setPaymentAmount(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button
                      color="primary"
                      onClick={handleBooking}
                      size="lg"
                      className="float-right"
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
