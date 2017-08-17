import React from 'react';
import {orange600} from 'material-ui/styles/colors'; //pink600, cyan600, purple600,
//import Assessment from 'material-ui/svg-icons/action/assessment';
import Face from 'material-ui/svg-icons/action/face';
//import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
// import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
// import InfoBox from '../components/dashboard/InfoBox';
//import NewOrders from '../components/dashboard/NewOrders';
//import MonthlySales from '../components/dashboard/MonthlySales';
import RealTimeVideoContainer from '../components/dashboard/RealTimeVideoContainer';
import StaticImage from '../components/dashboard/StaticImage';
import StudentListComponent from '../components/dashboard/StudentListComponent';
import UnRecognizedStudent from '../components/dashboard/UnRecognizedStudent';
import globalStyles from '../styles';
import Data from '../data';
import RaisedButton from 'material-ui/RaisedButton';

const DashboardPage = (props) => {

  return (
    <div>
      <h3 style={globalStyles.navigation}>Application / Main View</h3>

      <div className="row" style={{
        margin: 10
      }}>
        <RaisedButton label="Start Scaning" onTouchTap={props.handleClick}/>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
          <RealTimeVideoContainer data={Data.dashBoardPage.browserUsage} info={props.refLiveView}/>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
          <StaticImage info={props.refInput}/>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
          <UnRecognizedStudent data={props.refUnRecognizedFaces} name="Can't recognize faces" refClick={props.refClick} refClass = {props.refclass} refCurrentLecture={props.refCurrentLecture}/>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15 ">
          {/* <InfoBox Icon={Face} color={orange600} title="Total users in Class" value="15/30"/> */}
          <StudentListComponent data={props.refStudentList} totalStudents={props.refTotalStudents} name="List of students in class"/>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
