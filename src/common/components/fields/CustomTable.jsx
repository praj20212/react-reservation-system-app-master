import React from 'react';
import { Table } from 'semantic-ui-react'

class CustomTable extends React.Component{

    constructor(props){
      super(props);
    }

    setPageNumber = (pageNumber: number) => {
        this.props.loadNextData(pageNumber + 1);
        this.setState({ currPage: pageNumber });
    };

    getLastIndex = (startIndex: number) => {
        if (this.props.maxRecordPerPage > 0) {
            let lastIndex = startIndex + this.props.maxRecordPerPage;
            if (lastIndex > this.props.total) {
                lastIndex = this.props.total;
            }
            return lastIndex;
        } else {
            return this.props.total;
        }
    };

    getMaxWithLimit = (currValue, maxLimit) => (currValue > maxLimit ? maxLimit : currValue);

    getMinWithLimit = (currValue, minLimit) => (currValue < minLimit ? minLimit : currValue);

    getPaginationLowerUpperRange = (totalPage: number) => {
        let upperRange = this.props.currPage + 5,
            lowerRange = this.props.currPage - 5;
        if (lowerRange < 0) {
            upperRange = this.getMaxWithLimit(upperRange - lowerRange, totalPage);
            lowerRange = 0;
        } else if (upperRange > totalPage) {
            lowerRange = this.getMinWithLimit(lowerRange - (upperRange - totalPage), 0);
            upperRange = totalPage;
        }
        return { lr: lowerRange, ur: upperRange };
    };

    getFooter = () => {
        let startIndex = this.props.currPage * this.props.maxRecordPerPage;
        if (this.props.data) {
            return (
              <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell colSpan={this.props.headers.length} textAlign='right'>
                        <div style={{ float: "left", paddingTop: "10px", marginBottom: "10px" }}>
                            Showing {startIndex || 1} to {this.getLastIndex(startIndex)} of {this.props.total} Records
                        </div>
                        {this.props.maxRecordPerPage > 0 && this.getPaginations()}
                    </Table.HeaderCell>
                  </Table.Row>
              </Table.Footer>
            );
        }
    }

    getPaginations = () => {
        let numOfRecord = this.props.total;
        let pageNum = Math.ceil(numOfRecord / this.props.maxRecordPerPage);
        let pageItems = [],
            range = this.getPaginationLowerUpperRange(pageNum);
        for (let i = range.lr; i < range.ur; i++) {
            pageItems.push(
                <a
                    key={`${this.props.tableId}-page-${i}`}
                    className={`item ${this.props.currPage === i && "selected"}`}
                    onClick={this.setPageNumber.bind(this, i)}>
                    {i + 1}
                </a>
            );
        }
        return (
            <div className="ui right floated pagination menu">
                <a className={`icon item ${this.props.currPage === 0 && "disabled"}`}
                    onClick={() => {
                        if (this.props.currPage > 0) this.setPageNumber(this.props.currPage - 1);
                    }}>
                    <i className="left chevron icon" /></a>
                {pageItems}
                <a className={`icon item ${this.props.currPage === pageNum - 1 && "disabled"}`}
                    onClick={() => {
                        if (this.props.currPage < pageNum - 1) this.setPageNumber(this.props.currPage + 1);
                    }}>
                    <i className="right chevron icon" />
                </a>
            </div>
        );
    }

    getDataToDisp = () => {
        if (this.props.maxRecordPerPage > 0 && this.props.data.length > 0) {
            let displayedRecord = [];
            let lastIndex = this.props.maxRecordPerPage;
            if(lastIndex > this.props.data.length){
              lastIndex = this.props.data.length;
            }
            for (let k = 0; k < lastIndex; k++) {
                displayedRecord.push(this.props.data[k]);
            }
            return displayedRecord;
        } else {
            return this.props.data;
        }
    };

    render(){
      return(
        <Table celled>
            <Table.Header>
              <Table.Row>
                {this.props.headers.map(h => <Table.HeaderCell key={h.key}>{h.value}</Table.HeaderCell>)}
              </Table.Row>
            </Table.Header>
              <Table.Body>
                {
                  this.getDataToDisp().map((d, index) => <Table.Row key={`data-${index}`}>
                      {this.props.headers.map((h, cindex) =>
                          <Table.Cell key={`data-${index}-${cindex}`}>{d[h.key]}</Table.Cell>)}
                  </Table.Row>)
                }
              </Table.Body>
              {this.getFooter()}
        </Table>
      );
    }
}

export default CustomTable;
