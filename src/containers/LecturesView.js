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
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import Data from '../data';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

let _this; //ask aj
let arr = [];
let arr2 = [];

class LecturesView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      studentsInLecture: [],
      lectureName: '',
      semsterReportByUser: [],
      lecturePerStudentReport: [],
      studentNameReport: '',
      dialogOpen: false,
      showUser: false
    };
  }

  dateFormatter(dateTmp) {
    let date = new Date(dateTmp);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    return (month + '-' + dt + '-' + year);
  }

  componentDidMount() {
    arr = [];
    _this = this;
    console.log('value', this.props.params.value)
    axios.post("/classLecture", {id: this.props.params.value}).then(function(response) {
      console.log("im here", response.data);
      response.data.forEach((item, i) => {
        let tmpArr = [];
        tmpArr.push(item._id);
        tmpArr.push(_this.dateFormatter(item.date));
        tmpArr.push(item.Students.length);
        let counter = 0;
        item.Students.forEach(item2 => {
          if (item2.attendance === 1) {
            counter++;
          }
        });
        tmpArr.push(counter);
        tmpArr = tmpArr.concat(item.Students);
        console.log("temp Arr at ", i, tmpArr);
        arr.push(tmpArr);
      });
      _this.setState({data: arr})
      // console.log('arr is', arr);
    }).catch(function(error) {
      console.log(error);
    });

  }

  // componentWillReceiveProps(nextProps) {}

  studentHandleClick(e, i) {
    console.log("i is", i)
    e.preventDefault();
    console.log('arr is', arr);
    let arr1 = arr[i].slice(4);
    console.log('arr1 is', arr1);
    this.setState({dialogOpen: true, studentsInLecture: arr1, lectureName: arr[i][1]
    });
  }

  handleCloseModal() {
    console.log("here2");
    this.setState({dialogOpen: false});
  }

  handleByUserClick(e) {

    this.setState({
      showUser: !this.state.showUser
    })
    arr2 = arr[0].slice(4); // array of all students name in class
    arr2 = arr2.map(item => {
      return [item.student.fname + " " + item.student.lname];
    })

    //change map into this for so it will iteratte only once
    for (let i = 0; i < arr2.length; i++) {
      arr2[i].push(arr.length);
      arr2[i].push(0);
    }
    console.log("amount of lectures", arr.length);
    for (let j = 0; j < arr.length; j++) {
      for (let k = 4; k < arr[j].length; k++) {
        arr2[k - 4].push({lectureDate: arr[j][1], attendance: arr[j][k].attendance
        });
        if (arr[j][k].attendance === 1) {
          arr2[k - 4][2]++;
        }
      }
    }
    console.log("arr2", arr2);
    this.setState({semsterReportByUser: arr2});
  }

  studentNamesHandleClick(e, i) {
    console.log("i is", i)
    e.preventDefault();
    console.log('arr2 is', arr2);
    let arr2Tmp = arr2[i].slice(3);
    console.log('arr2 after slice is', arr2Tmp);
    this.setState({dialogOpen: true, lecturePerStudentReport: arr2Tmp, studentNameReport: arr2[i][0]
    });
  }

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

    if (this.state.showUser) { //user view component
      //if we want to see users- build components for this 2 cases
      return (
        <PageBase title="Lectures for calss x Page" navigation="Application / Table Page">
          <div>
            <div className="row" style={{
              margin: 10
            }}>
              <RaisedButton label={this.state.showUser
                ? "Show by lectures"
                : "Show by student Summary for Semster"} onTouchTap={(e) => this.handleByUserClick(e)}/>
            </div>
            {/* <Link to="/form">
              <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
                <ContentAdd/>
              </FloatingActionButton>
            </Link> */}

            <Dialog title={this.state.studentNameReport + " - lectures status"} actions={[< FlatButton label = "Start Scan" onTouchTap = {
                (e) => this.handleCloseModal(e)
              } />]} modal={false} open={this.state.dialogOpen} onRequestClose={(e) => this.handleCloseModal(e)}>

              <Table>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
                    <TableHeaderColumn style={styles.columns.name}>Name</TableHeaderColumn>
                    <TableHeaderColumn style={styles.columns.price}>Attend</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {this.state.lecturePerStudentReport.map((item, i) => <TableRow key={i}>
                    <TableRowColumn style={styles.columns.id}>{i}</TableRowColumn>
                    <TableRowColumn style={styles.columns.name}>{item.lectureDate}</TableRowColumn>
                    <TableRowColumn style={styles.columns.category}>{(item.attendance === 0)
                        ? 'No'
                        : 'Yes'}</TableRowColumn>
                  </TableRow>)}
                </TableBody>
              </Table>
            </Dialog>

            <Table>
              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.name}>Name</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.price}>Semster attendance user %</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.edit}>See Info By Lectures</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {this.state.semsterReportByUser.map((item, i) => <TableRow key={i}>
                  <TableRowColumn style={styles.columns.id}>{i}</TableRowColumn>
                  <TableRowColumn style={styles.columns.name}>{item[0]}
                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.category}>{(item[1] === 0)
                      ? 0
                      : ((item[2] / item[1]) * 100)}%</TableRowColumn>
                  <TableRowColumn style={styles.columns.edit}>
                    <FloatingActionButton zDepth={0} mini={true} backgroundColor={grey200} iconStyle={styles.editButton} onClick= {(e) => this.studentNamesHandleClick(e,i)}>
                      <ContentCreate/>
                    </FloatingActionButton>
                  </TableRowColumn>
                </TableRow>)}
              </TableBody>
            </Table>
          </div>
        </PageBase>
      );

    } else {
      return (
        <PageBase title="Lectures for calss x Page" navigation="Application / Table Page">
          <div>
            <div className="row" style={{
              margin: 10
            }}>
              <RaisedButton label={this.state.showUser
                ? "Show by lectures"
                : "Show by student Summary for Semster"} onTouchTap={(e) => this.handleByUserClick(e)}/>
            </div>
            {/* <Link to="/form">
              <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
                <ContentAdd/>
              </FloatingActionButton>
            </Link> */}

            <Dialog title={"Student status in this lecture - " + this.state.lectureName} actions={[< FlatButton label = "Start Scan" onTouchTap = {
                (e) => this.handleCloseModal(e)
              } />]} modal={false} open={this.state.dialogOpen} onRequestClose={(e) => this.handleCloseModal(e)}>

              <Table>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
                    <TableHeaderColumn style={styles.columns.name}>Name</TableHeaderColumn>
                    <TableHeaderColumn style={styles.columns.price}>Attend</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {this.state.studentsInLecture.map((item, i) => <TableRow key={i}>
                    <TableRowColumn style={styles.columns.id}>{i}</TableRowColumn>
                    <TableRowColumn style={styles.columns.name}>{item.student.fname + ' ' + item.student.lname}</TableRowColumn>
                    <TableRowColumn style={styles.columns.category}>{(item.attendance === 0)
                        ? 'No'
                        : 'Yes'}</TableRowColumn>
                  </TableRow>)}
                </TableBody>
              </Table>

            </Dialog>

            <Table>
              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.name}>Subject</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.price}>Date</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.category}>per Lecture Attendance summary %</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.edit}>See Students</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {this.state.data.map((item, i) => <TableRow key={i}>
                  <TableRowColumn style={styles.columns.id}>{i}</TableRowColumn>
                  <TableRowColumn style={styles.columns.name}>Place holder
                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.price}>{item[1]}</TableRowColumn>
                  <TableRowColumn style={styles.columns.category}>{(item[2] === 0)
                      ? 0
                      : ((item[3] / item[2]) * 100)}%</TableRowColumn>
                  <TableRowColumn style={styles.columns.edit}>
                    <FloatingActionButton zDepth={0} mini={true} backgroundColor={grey200} iconStyle={styles.editButton} onClick= {(e) => this.studentHandleClick(e,i)}>
                      <ContentCreate/>
                    </FloatingActionButton>
                    {/* <Link className="button" to={{
                      pathname: "/LecturesView",
                      param1: "Par1"
                    }}>
                    </Link> */}
                  </TableRowColumn>
                </TableRow>)}
              </TableBody>
            </Table>
          </div>
        </PageBase>
      );

    }

  }

}

export default LecturesView;
