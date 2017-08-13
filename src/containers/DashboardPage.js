import React from 'react';
import {orange600} from 'material-ui/styles/colors'; //pink600, cyan600, purple600,
//import Assessment from 'material-ui/svg-icons/action/assessment';
import Face from 'material-ui/svg-icons/action/face';
//import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
// import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import InfoBox from '../components/dashboard/InfoBox';
//import NewOrders from '../components/dashboard/NewOrders';
//import MonthlySales from '../components/dashboard/MonthlySales';
import BrowserUsage from '../components/dashboard/BrowserUsage';
import StaticImage from '../components/dashboard/StaticImage';
import RecentlyProducts from '../components/dashboard/RecentlyProducts';
import UnRecognizedStudent from '../components/dashboard/UnRecognizedStudent';
import globalStyles from '../styles';
import Data from '../data';
import RaisedButton from 'material-ui/RaisedButton';

const DashboardPage = (props) => {

  return (
    <div>

      <h3 style={globalStyles.navigation}>Application / Dashboard</h3>

      <div className="row" style={{
        margin: 10
      }}>
        <RaisedButton label="Start Scaning" onTouchTap={props.handleClick}/>
      </div>

      <div className="row">

        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
          <BrowserUsage data={Data.dashBoardPage.browserUsage} info={props.refLiveView}/>
        </div>

        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
          {/* <BrowserUsage data={Data.dashBoardPage.browserUsage}/> */}
          <StaticImage info={props.refInput}/>
        </div>
      </div>

      <div className="row">

        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
          <UnRecognizedStudent data={props.refUnRecognizedFaces} name="Can't recognize faces" refClick={props.refClick}/>
        </div>
        {/* Old Data {Data.dashBoardPage.recentProducts} */}
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15 ">
          <InfoBox Icon={Face} color={orange600} title="Total users in Class" value="15/30"/>
          <RecentlyProducts data={props.refStudentList} name="List of students in class"/>
        </div>
      </div>

      {/* <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
          <NewOrders data={Data.dashBoardPage.newOrders}/>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15">
          <MonthlySales data={Data.dashBoardPage.monthlySales}/>
        </div>
      </div> */}

      {/* <div className="row">
         <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox Icon={ShoppingCart}
                   color={pink600}
                   title="Total Profit"
                   value="1500k"
          />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox Icon={ThumbUp}
                   color={cyan600}
                   title="Likes"
                   value="4231"
          />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox Icon={Assessment}
                   color={purple600}
                   title="Sales"
                   value="460"
          />
        </div>
      </div> */}

    </div>
  );
};

export default DashboardPage;
