import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo'
import { GET_ITINERARY_BY_ID } from './graphql'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'address', numeric: false, disablePadding: true, label: 'Address' },
  { id: 'cost', numeric: true, disablePadding: false, label: 'Average Cost' }
];

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

class Itinerary extends Component {

  state = {
    selected: []
  }

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };


  
  isSelected = id => this.state.selected.indexOf(id) !== -1
  
  render() {
    const itineraryId = this.props.location.state;
    const { selected } = this.state;
    return (
      <div>
        <Query query={GET_ITINERARY_BY_ID} variables={{ id: itineraryId }}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading'
            if (error) return 'Error'
            let merchants = data.itineraryById.merchants.sort((a, b) => {
              return b.numTransactions - a.numTransactions;
            });
            data = data.itineraryById;
            for (let i = 0; i < merchants.length; i++) {
              merchants[i]['id'] = i + 1;
            }
            return (
              <div>
                <h1 align="center">{data.name}</h1>
                <Table padding='dense'>
                  <TableHead>
                    <TableRow>
                      <CustomTableCell padding="checkbox">
                      </CustomTableCell>
                      {columnData.map(column => {
                        return (
                          <CustomTableCell
                            key={column.id}
                            align={'center'}
                            padding={column.disablePadding ? 'none' : 'default'}
                          >
                          {column.label}
                          </CustomTableCell>
                        );
                      }, this)}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.merchants.map(merchant => {
                      const isSelected = this.isSelected(merchant.id);
                      return (
                        <TableRow
                          hover
                          onClick={event => this.handleClick(event, merchant.id)}
                          role="checkbox"
                          aria-checked={isSelected}
                          tabIndex="-1"
                          key={merchant.id}
                          selected={isSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox checked={isSelected} />
                          </TableCell>
                          <TableCell padding="dense">
                            {merchant.name}
                          </TableCell>
                          <TableCell padding="dense">
                            {merchant.address}
                          </TableCell>
                          <TableCell padding="dense">
                            {merchant.avgAmount}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            )
          }}

        </Query>
      </div>
    )
  }
}

export default withRouter(Itinerary)
