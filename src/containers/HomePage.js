import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Container from '@material-ui/core/Container';
import ZoomIn from '@material-ui/icons/ZoomIn';
import purple from '@material-ui/core/colors/purple';
import data from '../data';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 650
  }
});

class HomePage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      appList: data.applications,
      filteredList: {},
      searchText: ''
    };
  }
  componentDidMount() {
    console.log(this.state.appList);
  }

  handleChange = event => {
    const filterList = this.state.appList.filter(item =>
      item.name ? item.name.toLowerCase().includes(event.target.value) : false
    );
    this.setState({
      filteredList: filterList,
      searchText: event.target.value
    });
  };
  render() {
    const { classes } = this.props;
    const list =
      (this.state.searchText !== '' && this.state.filteredList) ||
      this.state.appList;
    return (
      <div>
        <Container fixed>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: 10
            }}
          >
            <span style={{ color: purple[800] }}>Welcome user!</span>
            <span
              style={{
                display: 'flex',
                justifyContent: 'end',
                position: 'relative'
              }}
            >
              <SearchIcon
                style={{
                  paddingLeft: 3,
                  position: 'absolute'
                }}
              />
              <input
                style={{ width: 250, paddingLeft: 30 }}
                type="text"
                placeholder="Search…"
                value={this.state.searchText}
                onChange={event => this.handleChange(event)}
              />
            </span>
          </div>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Application Name</TableCell>
                  <TableCell align="center">GUID</TableCell>
                  <TableCell align="center">State</TableCell>
                  <TableCell align="center">Total Versions</TableCell>
                  <TableCell align="center">Current Version</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map(row => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      <Link
                        style={{ textDecoration: 'none', color: 'black' }}
                        to={{ pathname: `/detailed-view/${row.guid}` }}
                      >
                        {row.name}
                      </Link>
                    </TableCell>
                    <TableCell align="center">{row.guid}</TableCell>
                    <TableCell align="center">{row.state.toString()}</TableCell>
                    <TableCell align="center">{row.versions.length}</TableCell>
                    {row.versions.map(
                      item =>
                        item.currentVersion && (
                          <TableCell align="center">{item.name}</TableCell>
                        )
                    )}
                    <TableCell>
                      <Button>
                        <ZoomIn />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button>
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {this.state.searchText !== '' &&
              this.state.filteredList.length === 0 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: 10
                  }}
                >
                  0 search result
                </div>
              )}
          </Paper>
          <div
            style={{
              display: 'flex',
              marginTop: 15,
              justifyContent: 'center'
            }}
          >
            <Button variant="contained" className={classes.button}>
              Add Application
            </Button>
          </div>
        </Container>
      </div>
    );
  }
}
HomePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomePage);