import React, {PropTypes} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header';
import LeftDrawer from '../components/LeftDrawer';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';
import ThemeDefault from '../theme-default';
import Data from '../data';
import io from 'socket.io-client';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import axios from 'axios';
import DatePicker from 'material-ui/DatePicker';

// import DialogModal from '../components/DialogModal';

let socket
let _this
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: false,
      dialogOpen: false,
      image: "null",
      liveView: "null",
      searchTime: "3",
      term: 'Fall',
      class: '597b6f386a14a22e7cd0a6d7',
      currentLecture: '123',
      date: new Date().toISOString(),
      totalStudents:30,
      studentsList: [
        {
          id: 0,
          title: 'Yash Nardtiva',
          text: 'Time : 9:04',
          _id: 123
        }
      ],
      UnRecognizedFaces: [
        {
          id: 0,
          title: 'Dummy Data',
          text: 'Dummy Data 1',
          face_token: '',
          avatar: ''
        },
      ],
      classes:[]
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    _this = this;

//Scale change this id to the professor id !!!!!!
//after sign in save the info on this page!! professor id

    axios.post("/classInfo", {id: '597b5e12a1537a32985322cc'}).then(function(response) {
      _this.setState({classes: response.data});
    }).catch(function(error) {
      console.log(error);
    });

    var camSocket = io.connect("http://localhost:3000/cam0");

    //deal with printing video
    camSocket.on('data', (data) => {
      // console.log(data);
      this.setState({liveView: data});
    });

    socket = io.connect("http://localhost:3000");
    socket.on('connect', () => {
      console.log("Connected!");
      // dispatch(AddItem(res))
    });

    socket.on('dataFace', (data) => {
      console.log("Connected!");
      // dispatch(AddItem(res))
      this.setState({image: data});
    });

    socket.on('unRegisteredFace', (data) => {
      console.log("got unrecognized face");
      // console.log(data);
      var UnRecognizedFacesTmp = this.state.UnRecognizedFaces.slice();
      //ask jay
      //Save tmp face into data and  compare with new face
      var infoIn64 = "data:image/jpg;base64," + data.faceAvatar;
      let checkForExistnce = false;
      if (!checkForExistnce) {
        console.log("new user un-defined");
        var tmpData = {
          id: UnRecognizedFacesTmp.length,
          title: 'a',
          text: 'b',
          face_token: data.face_token,
          avatar: infoIn64
        };
        UnRecognizedFacesTmp.push(tmpData);
        this.setState({UnRecognizedFaces: UnRecognizedFacesTmp});
        console.log(this.state.UnRecognizedFaces);
      }
    });

    socket.on('RegisteredFace', (data) => {
      console.log(data.person);
      var studentsListTmp = this.state.studentsList.slice();
      let checkForExistnce = false;
      studentsListTmp.forEach((item) => {
        if (item._id === data.person[0]._id) {
          checkForExistnce = true;
          console.log("user is in the list already");
        }
      });

      if (!checkForExistnce) {
        console.log("new user")
        var tmpDate = new Date();
        var finalDate = this.addZero(tmpDate.getHours()) + ":" + this.addZero(tmpDate.getMinutes()) + ":" + this.addZero(tmpDate.getSeconds());
        var tmpData = {
          id: studentsListTmp.length,
          title: `first name:  ${data.person[0].fname} last name: ${data.person[0].lname}`,
          text: 'Time : ' + finalDate,
          _id: data.person[0]._id
        };
        studentsListTmp.push(tmpData);
        //TODO: update the status of total count here
        this.setState({studentsList: studentsListTmp});

        // axios.post("/startAnalysis", {
        //   term: this.state.term,
        //   class: this.state.class,
        //   date: this.state.date,
        //   searchTime: this.state.searchTime
        // }).then(function(response) {
        //   console.log("there is response", response);
        // }).catch(function(error) {
        //   console.log(error);
        // });

      }

      // socket.on('drawData', (res) => {
      //
      //   var tmp = JSON.parse(res.body);
      //   if (tmp.faces.length > 0) {
      //     console.log("there are faces", tmp.faces)
      //   }
      //
      //   //  console.log(this.state.image)
      //   console.log("information is here", res)
      //   this.setState({
      //     image: `data:image/jpeg;base64,` + res.image
      //   })
      // });

    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({
        navDrawerOpen: nextProps.width === LARGE
      });
    }
  }

  addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

  // handleCustomClick(type, event, data, value) { //jay change implement this in the future
  //   var val = value;
  //   if (type === 'date') {
  //     val = new Date(data);
  //   } else if (type === 'searchTime') {
  //     val = data;
  //   }
  //   this.setState({[type]: val});
  // }

  handleChangeModal(event, data, value) {
    // this.handleCustomClick('class', event, data, value);
    console.log('here ', data, value)
    this.setState({class: value});
  }

  handleChangeModalTerm(event, data, value) {
    console.log('term', data, value)
    this.setState({term: value});
  }
  handleChangeModalDate(event, data, value) {
    console.log('date ', data, value)
    this.setState({date: new Date(data)});
  }
  handleChangeModalTime(event, data, value) {
    console.log('time ', data, value)
    this.setState({searchTime: data});
  }

  handleCloseModal() {
    console.log("here2",this.state.class);
    this.setState({dialogOpen: false});
    axios.post("/startAnalysis", {
      term: this.state.term,
      class: this.state.class,
      date: this.state.date,
      searchTime: this.state.searchTime,
      classId: this.state.class
    }).then(function(response) {
      console.log("there is response hhhh", response);
      console.log(response.data);
      _this.setState({currentLecture: response.data.class,totalStudents:response.data.studentNum})
    }).catch(function(error) {
      console.log(error);
    });
    socket.emit('startAnalysis', {my: "benjamin"});
  }

  handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
    this.setState({dialogOpen: true});
  }

  onClickOneFace(data) {
console.log(_this.state.currentLecture,_this.state.class);
    console.log("clicked : ************** ", data);

    var UnRecognizedFacesTmp = _this.state.UnRecognizedFaces.slice();

    console.log("array befoe splice", _this.state.UnRecognizedFaces);
    console.log("data id to delete is", data.id);
    UnRecognizedFacesTmp.splice(data.id, 1);
    console.log("array after splice", UnRecognizedFacesTmp);
    for (var i = 0; i < UnRecognizedFacesTmp.length; i++) {
      UnRecognizedFacesTmp[i].id = i;
    }

    var recognizedFaces =_this.state.studentsList.slice();


    var studentObj =  {
        id: recognizedFaces.length,
        title: data.fname+" "+ data.lname,
        text: 'Time : '+ _this.addZero(new Date().getHours())+":"+ _this.addZero(new Date().getMinutes()),
        _id: 123
      };
      recognizedFaces.push(studentObj);

    _this.setState({UnRecognizedFaces: UnRecognizedFacesTmp,studentsList:recognizedFaces});

  }

  render() {
    let {navDrawerOpen, dialogOpen} = this.state;
    const paddingLeftDrawerOpen = 236;

    const styles = {
      header: {
        paddingLeft: navDrawerOpen
          ? paddingLeftDrawerOpen
          : 0
      },
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft: navDrawerOpen && this.props.width !== SMALL
          ? paddingLeftDrawerOpen
          : 0
      }
    };

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <Header styles={styles.header} handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}/>

        <LeftDrawer navDrawerOpen={navDrawerOpen} menus={Data.menus} username="Professor Benjamin"/>

        <Dialog title="Start a Lecture" actions={[< FlatButton label = "Start Scan" onClick = {
              (e) => this.handleCloseModal(e)
            } />]} modal={false} open={this.state.dialogOpen} onRequestClose={(e) => this.handleCloseModal(e)}>
            Please choose info before scan
            <SelectField floatingLabelText="Term" value={this.state.term} fullWidth={true} onChange={this.handleChangeModalTerm.bind(this)}>
              <MenuItem key={0} value='Fall' primaryText="Fall"/>
              <MenuItem key={1} value='Spring' primaryText="Spring"/>
              <MenuItem key={2} value='Summer' primaryText="Summer"/>
            </SelectField>
            <DatePicker hintText="Date Picker" defaultDate ={new Date()} onChange={this.handleChangeModalDate.bind(this)}/>
            <SelectField floatingLabelText="Class" value={this.state.class} fullWidth={true} onChange={this.handleChangeModal.bind(this)}>
              {/* TODO: take class from DB */}
              {this.state.classes.map((item,i) =>{
                return( <MenuItem key={i} value={item._id} primaryText={item.name} />)
              })}
            </SelectField>
            <TextField name="SearchTime" hintText="Time for search in min" floatingLabelText="Time for search" fullWidth={true} value={this.state.searchTime} onChange={this.handleChangeModalTime.bind(this)}/>
          </Dialog>

          <div style={styles.container}>
            {React.cloneElement(this.props.children, {
              handleClick: this.handleClick,
              refInput: this.state.image,
              refLiveView: this.state.liveView,
              refStudentList: this.state.studentsList,
              refUnRecognizedFaces: this.state.UnRecognizedFaces,
              refClick: this.onClickOneFace,
              refclass: this.state.class,
              refCurrentLecture: this.state.currentLecture,
              refTotalStudents :this.state.totalStudents
            })}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  width: PropTypes.number,
  handleClick: PropTypes.func
};

export default withWidth()(App);
