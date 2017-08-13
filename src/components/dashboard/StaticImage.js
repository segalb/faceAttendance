import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import {PieChart, Pie, Cell, ResponsiveContainer} from 'recharts';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import GlobalStyles from '../../styles';

//

let canvas;
let ctx;
class StaticImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: ""
    }
  }

  componentDidMount() {

    /*Change
        //ctx = this.canvas.getContext('2d');
*/

    //  canvas = this.cnvas ReactDOM.findDOMNode(this.refs.myCanvas);

    // ctx.fillStyle = 'rgb(200,0,0)';
    // ctx.fillRect(10, 10, 55, 50);
    // ctx.fillRect(0, 0, 100, 100);

    //  ctx.scale(0.5, 0.45);

    console.log("props", this.props.info)

  }

  componentWillReceiveProps(nextProps) {
    //  console.log("I got new props")
    if (this.props.info !== "null") {

      var base64data = (this.props.info).toString('base64');
      base64data = "data:image/jpg;base64," + base64data;
      console.log(base64data);
      this.setState({img: base64data});

      ////////
      // var bytes = new Uint8Array(this.props.info);
      //
      // var blob = new Blob([bytes], {type: 'application/octet-binary'});
      //
      // var url = URL.createObjectURL(blob);
      //
      // var img = new Image;

      // img.onload = function() {
      //   URL.revokeObjectURL(url);
      //   //  var scale = Math.min(640 / img.width, 480 / img.height);
      //   // console.log(img.width)
      //   // console.log(img.height)
      //   // var wrh = img.width / img.height;
      //   // var newWidth = 520;
      //   // var newHeight = newWidth / wrh;
      //   // if (newHeight > 520) {
      //   //   newHeight = 520;
      //   //   newWidth = newHeight * wrh;
      //   // }
      //   // get the top left position of the image
      //   // var x = (640 / 2) - (img.width / 2) * scale;
      //   // var y = (480 / 2) - (img.v / 2) * scale;
      //   // ctx.drawImage(img, 0, 0, 1280, 720, 0, 0, 640, 480);
      //   // // ctx.drawImage(img, 0, 0);
      //   // ctx.drawImage(img, 0, 0);
      //
      //   var scale = Math.min(600 / img.width, 200 / img.height, 1.0);
      //   var imageInfo = {
      //     width: img.width * scale,
      //     height: img.height * scale,
      //     offsetX: (680 - img.width * scale) / 2,
      //     offsetY: (200 - img.height * scale) / 2,
      //     scale: scale
      //   };
      //   // ctx.drawImage(img, 0, 0, 1280, 720, 0, 0, 300, 140);
      //
      //   ctx.drawImage(img, 0, 0);
      //   // ctx.drawImage(img, 0, 0, 1280, 720, 0, 0, 640, 480);
      // };
      // img.src = url;

      ///////////////////

    }
  }

  render() {
    const styles = {
      paper: {
        minHeight: 460,
        padding: 10
      },
      legend: {
        paddingTop: 20
      },
      pieChartDiv: {
        height: 290,
        textAlign: 'center'
      },
      canvas: {
        width: "640",
        height: "480",
        // minHeight: "460",
        // minWidth: "610"
      },
      liveStream: {
        width: "100%"
      }
    };

    return (
      <Paper style={styles.paper}>
        <span style={GlobalStyles.title}>Real Time Faces</span>

        <div style={GlobalStyles.clear}/> {/* <canvas data-paper-resize style={styles.canvas} ref={canvas => this.canvas = canvas}/> */}
        <img src={this.state.img}/> {/* style={styles.liveStream} */}
      </Paper>
    );
  }
}

StaticImage.propTypes = {
  data: PropTypes.array
};

export default StaticImage;
