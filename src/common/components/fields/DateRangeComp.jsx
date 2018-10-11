import React from 'react';
import {DateRangePicker} from 'react-dates';


class DateRangeComp extends React.Component{

   constructor(props){
     super(props);
     this.state = {
       focusedInput: ''
     };
   }

   render(){
     return(
       <DateRangePicker
          startDate={this.props.startDate}
          endDate={this.props.endDate}
          onDatesChange={({ startDate, endDate }) =>
                this.props.onDateChange({ startDate, endDate })}
          focusedInput={this.state.focusedInput}
          onFocusChange={focusedInput => this.setState({ focusedInput })}
       />
     );
   }
}

export default DateRangeComp;
