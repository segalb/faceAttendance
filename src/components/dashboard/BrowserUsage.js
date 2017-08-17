import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import {PieChart, Pie, Cell, ResponsiveContainer} from 'recharts';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import GlobalStyles from '../../styles';
import RaisedButton from 'material-ui/RaisedButton';

let ctx;
let canvas;
class BrowserUsage extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //  canvas = this.cnvas ReactDOM.findDOMNode(this.refs.myCanvas);
    ctx = this.canvas.getContext('2d');
    // ctx.fillStyle = 'rgb(200,0,0)';
    // ctx.fillRect(10, 10, 55, 50);
    // ctx.fillRect(0, 0, 100, 100);
    // ctx.scale(0.25, 0.2);

    // console.log("props", this.props.info)

  }

  componentWillReceiveProps(nextProps) {
    //console.log("I got new props")
    if (this.props.info !== "null") {

      var bytes = new Uint8Array(this.props.info);

      var blob = new Blob([bytes], {type: 'application/octet-binary'});

      var url = URL.createObjectURL(blob);

      var img = new Image;

      img.onload = function() {
        // console.log(img.width);
        // console.log(img.height)
        URL.revokeObjectURL(url);

        // ctx.drawImage(img, 0, 0, 1280, 720, 0, 0, 640, 480);
          // ctx.drawImage(img, 0, 0, 1280, 960, 0, 0, 512, 384);
              ctx.drawImage(img, 0, 0, 640, 480, 0, 0, 512, 384);
        // ctx.drawImage(img, 0, 0);

      };
      img.src = url;
    }
  }

  render() {
    const styles = {
      paper: {
        minHeight: 460,
        paddingLeft: 30,
        paddingTop: 10,
        paddingRight:10
      },
      legend: {
        paddingTop: 20
      },
      pieChartDiv: {
        height: 290,
        textAlign: 'center'
      },
      canvas: {
        width: "100%",
        height: "100%",
        minHeight: "460",
        minWidth: "560",
      },
      liveStream: {
        width: "100%"
      }
    };

    return (
      <Paper style={styles.paper}>
        <span style={GlobalStyles.title}>Real time input</span>

        <div style={GlobalStyles.clear}/> {/* <canvas ref="canvas" style={styles.canvas} /> */}
        {/*important*/}

        {/* style={styles.canvas} */}
        {/*  */}
        <canvas data-paper-resize width="512" height="384"  ref={canvas => this.canvas = canvas}></canvas>

        {/* <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8"> */}

        {/* <div style={styles.pieChartDiv}> */}
        {/* <ResponsiveContainer> */}
        {/* <PieChart >
                  <Pie
                    innerRadius={80}
                    outerRadius={130}
                    data={props.data}
                    fill="#8884d8">
                    {
                      props.data.map((item) => <Cell key={item.name} fill={item.color}/>)
                    }
                  </Pie>
                </PieChart> */}
        {/* </ResponsiveContainer> */}
        {/* </div> */}
        {/* </div> */}

        {/* <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
            <div style={styles.legend}>
              <div style={styles.legend}>
                <List>
                  {props.data.map((item) =>
                    <ListItem
                      key={item.name}
                      leftAvatar={
                        <Avatar icon={item.icon}
                                backgroundColor={item.color}/>
                      }>
                      {item.name}
                    </ListItem>
                  )}
                </List>
              </div>
            </div>
          </div> */}
        {/* </div> */}
      </Paper>
    );
  }
}

BrowserUsage.propTypes = {
  data: PropTypes.array
};

export default BrowserUsage;
