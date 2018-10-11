import React from 'react';
import { Button, Form} from 'semantic-ui-react';

import {getDisplayDate} from '../../../shared/utility';
import SingleDateSel from '../../fields/SingleDateSel';

class SearchComp extends React.Component{

    constructor(props){
      super(props);

      this.state = {
        by:'id',
        id:'',
        name:'',
        hotelName:'',
        startDate:null,
        endDate:null
      }

      this.onSelectChange = this.onSelectChange.bind(this);
      this.setValueInState = this.setValueInState.bind(this);
      this.onChange = this.onChange.bind(this);
      this.sumbitSearch = this.sumbitSearch.bind(this);
    }

    onSelectChange(e, data){
      this.setValueInState(data.name, data.value);
    }

    setValueInState(name, value){
      this.setState({[name]: value});
    }

    onChange(e){
      this.setState({[e.target.name]: e.target.value});
    }

    sumbitSearch(){
      let url;
      if('id' === this.state.by){
        url = this.state.id ? `reservation/${this.state.id}` : 'reservations';
      } else {
        url = this.addQueryInAttr('reservations', 'name', this.state.name);
        url = this.addQueryInAttr(url, 'hotelName', this.state.hotelName);
        if(this.state.startDate){
          url = this.addQueryInAttr(url, 'arrivalDate', getDisplayDate(this.state.startDate));
        }
        if(this.state.endDate){
          url = this.addQueryInAttr(url, 'departureDate', getDisplayDate(this.state.endDate));
        }
      }
      this.props.searchReservations(url);
    }

    addQueryInAttr(url, key, value){
      if(value){
        if(url.indexOf('?') > -1){
          url+='&';
        } else {
          url+='?';
        }
        url+=key+"="+value;
      }
      return url;
    }

    render(){
      return(
        <Form>
          <Form.Select name='by' label='Search By' options={[
              {key:'id', text: 'By Id', value: 'id'},
              {key:'other', text: 'Other', value: 'other'},
            ]} value={this.state.by} onChange={this.onSelectChange}/>
          {
            'id' === this.state.by ?
            <Form.Input name='id'
                label='Reservation Id' placeholder='Reservation Id'
                onChange={this.onChange}/> :
            <Form.Group>
                <Form.Input name='name'
                    label='Name' placeholder='Name' width={4}
                    onChange={this.onChange}/>
                <Form.Input name='hotelName'
                    label='Hotel Name' placeholder='Hotel Name' width={4}
                    onChange={this.onChange}/>
                <Form.Field label='Arrival Date'
                  control={SingleDateSel}
                  name='startDate'
                  value={this.state.startDate}
                  setDate={this.setValueInState}/>
                <Form.Field label='Departure Date'
                  control={SingleDateSel}
                  name='endDate'
                  value={this.state.endDate}
                  setDate={this.setValueInState}/>
            </Form.Group>
          }
          <Button type='submit'
            floated='right' style={{marginBottom:10}} primary
            onClick={this.sumbitSearch}>Search</Button>
        </Form>
      );
    }

}

export default SearchComp;
