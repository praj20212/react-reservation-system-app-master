import React from 'react';
import {Menu, Button} from 'semantic-ui-react';

import Reservation from '../reservations/Reservation';
import ReservationSearch from '../reservations/search/ReservationSearch';
import {NotificationContainer} from 'react-notifications';

class App extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      activeComp : 'reserve'
    }
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeComp: name });
  }

  render(){
    return(
      <div>
        <Menu>
            <Menu.Item>Reservation Systems</Menu.Item>
            <Menu.Item
              active={this.state.activeComp === 'reserve'}
              position='right'
              fitted='horizontally'>
                  <Button name='reserve' onClick={this.handleItemClick}
                    className='menu-button'
                    primary>Do Reservation</Button>
                  <Button name='search' onClick={this.handleItemClick}
                    className='menu-button'>Search Reservation</Button>
            </Menu.Item>
        </Menu>
        <div className='cont-body'>
          {this.state.activeComp === 'reserve' ? <Reservation/> : <ReservationSearch/>}
        </div>
        <NotificationContainer/>
      </div>
    );
  }
}

export default App;
