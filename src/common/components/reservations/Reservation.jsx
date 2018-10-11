import React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { connect } from "react-redux";

import {setStateField, bookNewReservation} from './ReservationActions';
import DateRangeComp from '../fields/DateRangeComp';
import {getDisplayDate} from '../../shared/utility';

class Reservation extends React.Component {

    constructor(props){
      super(props);

      this.state = {
        errorField: {}
      }
      this.handleDateChanges = this.handleDateChanges.bind(this);
      this.submitForm = this.submitForm.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.validateFields = this.validateFields.bind(this);
    }

    handleChange(e) {
      this.props.dispatch(setStateField(e.target.name, e.target.value));
      this.setState({
        errorField: {
          ...this.state.errorField,
          [e.target.name]:false
        }
      });
    }

    handleDateChanges({startDate, endDate}){
      this.props.dispatch(setStateField('arrivalDate', startDate));
      this.props.dispatch(setStateField('departureDate', endDate));
      this.setState({
        errorField: {
          ...this.state.errorField,
          arrivalDate:false,
          departureDate:false
        }
      });
    }

    submitForm(){
        let isValid = this.validateFields();
        if(isValid){
          let data = {
              name: this.props.name,
              hotelName: this.props.hotelName,
              arrivalDate: getDisplayDate(this.props.arrivalDate),
              departureDate: getDisplayDate(this.props.departureDate)
          };
          this.props.dispatch(bookNewReservation(data));
        }
    }

    validateFields(){
      let errorFileld = {};
      let isValid = true;
      let keys = ['name', 'hotelName', 'arrivalDate', 'departureDate'];
      keys.forEach(key => {
        if(!this.props[key]){
          errorFileld[key] = true;
          isValid = false;
        }
      });
      if(!isValid){
        this.setState({errorField: errorFileld});
      }
      return isValid;
    }

    render(){
      return(
        <div className='form-cont-cust'>
          <Segment>
            <h2>Reservation</h2>
            <Form>
                <Form.Field error={this.state.errorField.name}>
                  <label>Name</label>
                  <input placeholder='Name'
                    name='name'
                    value={this.props.name}
                    onChange={this.handleChange}/>
                </Form.Field>
                <Form.Field error={this.state.errorField.hotelName}>
                  <label>Hotel Name</label>
                  <input placeholder='Hotel Name'
                    name='hotelName'
                    value={this.props.hotelName}
                    onChange={this.handleChange}/>
                </Form.Field>
                <Form.Field label='Arrival and Departure Date'
                  control={DateRangeComp}
                  startDate={this.props.arrivalDate}
                  endDate={this.props.departureDate}
                  onDateChange={this.handleDateChanges}
                  error={this.state.errorField.arrivalDate || this.state.errorField.departureDate}/>
                <Button type='submit' onClick={this.submitForm} primary>Submit</Button>
            </Form>
          </Segment>
        </div>
      );
    }

}

const mapStateToProps = state => ({
    name: state.reservations.name,
    hotelName: state.reservations.hotelName,
    arrivalDate: state.reservations.arrivalDate,
    departureDate: state.reservations.departureDate
});
export default connect(mapStateToProps)(Reservation);
