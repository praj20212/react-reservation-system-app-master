import React from 'react';
import { Segment } from 'semantic-ui-react';
import { connect } from "react-redux";

import { searchReservations } from './SearchActions';
import CustomTable from '../../fields/CustomTable';
import SearchComp from './SearchComp';
import {
  reservationTableHeader,
  PAGINATION_PAGE_PER_PAGE
} from '../../../shared/ApplicationConstants';


class ReservationSearch extends React.Component {

    constructor(props){
      super(props);
      this.searchRes = this.searchRes.bind(this);
    }

    componentDidMount(){
        this.searchRes(this.props.currUrl);
    }

    loadNextData = (nextPage) => this.props.dispatch(searchReservations(this.props.currUrl, nextPage));

    searchRes = (url) => this.props.dispatch(searchReservations(url, 1));

    render(){
      return(
        <div className='form-cont-cust'>
          <Segment>
            <h2>Search Reservations</h2>
            <SearchComp searchReservations={this.searchRes}/>
            <CustomTable
                maxRecordPerPage={PAGINATION_PAGE_PER_PAGE}
                total={this.props.total}
                headers={reservationTableHeader}
                data={this.props.data}
                loadNextData={this.loadNextData}
                currPage={this.props.currPage}/>
          </Segment>
        </div>
      )
    }

}

const mapStateToProps = state => ({
    data: state.search.data,
    total: state.search.total,
    currUrl: state.search.currUrl,
    currPage: state.search.currPage
});
export default connect(mapStateToProps)(ReservationSearch);
