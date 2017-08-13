import React from 'react';
import {Link} from 'react-router';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500, grey200, grey500} from 'material-ui/styles/colors';
import PageBase from '../components/PageBase';
import Data from '../data';
import axios from 'axios';

let _this; //ask aj

class TablePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    _this = this;
    axios.post("/classInfo", {id: '597b5e12a1537a32985322cc'}).then(function(response) {
      console.log("im here", response.data);
      _this.setState({data: response.data});
    }).catch(function(error) {
      console.log(error);
    });
  }

  componentWillReceiveProps(nextProps) {}

  render() {
    const styles = {
      floatingActionButton: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed'
      },
      editButton: {
        fill: grey500
      },
      columns: {
        id: {
          width: '10%'
        },
        name: {
          width: '40%'
        },
        price: {
          width: '20%'
        },
        category: {
          width: '20%'
        },
        edit: {
          width: '10%'
        }
      }
    };

    return (
      <PageBase title="Classes Page" navigation="Application / Table Page">

        <div>
          {/* <Link to="/form">
            <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
              <ContentAdd/>
            </FloatingActionButton>
          </Link> */}

          <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.name}>Name</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.price}>Term</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.category}>Year</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.edit}>Analysis</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.state.data.map((item, i) => <TableRow key={i}>
                <TableRowColumn style={styles.columns.id}>{i}</TableRowColumn>
                <TableRowColumn style={styles.columns.name}>{item.name}</TableRowColumn>
                <TableRowColumn style={styles.columns.price}>{item.term}</TableRowColumn>
                <TableRowColumn style={styles.columns.category}>{item.year}</TableRowColumn>
                <TableRowColumn style={styles.columns.edit}>
                  <Link className="button" to={{
                    pathname: `/LecturesView/${item._id}`,
                    param1: "Par1"
                  }}>
                    <FloatingActionButton zDepth={0} mini={true} backgroundColor={grey200} iconStyle={styles.editButton}>
                      <ContentCreate/>
                    </FloatingActionButton>
                  </Link>
                </TableRowColumn>
              </TableRow>)}
            </TableBody>
          </Table>
        </div>
      </PageBase>
    );

  }

}

export default TablePage;
