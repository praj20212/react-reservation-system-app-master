import React from 'react';
import {SingleDatePicker} from 'react-dates';

class SingleDateSel extends React.Component{

    constructor(props){
      super(props);

      this.state = {
        focused : false
      };

      this.onFocusChange = this.onFocusChange.bind(this);
      this.onDateChange = this.onDateChange.bind(this);
    }

    onDateChange(date) {
        this.props.setDate(this.props.name, date);
    }

    onFocusChange({ focused }) {
        this.setState({ focused });
    }

    render(){
      return(
        <SingleDatePicker
            id={this.props.name}
            date={this.props.value}
            focused={this.state.focused}
            onDateChange={this.onDateChange}
            onFocusChange={this.onFocusChange}
        />
      );
    }

}

export default SingleDateSel;
