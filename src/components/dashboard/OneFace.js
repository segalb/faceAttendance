import React, {PropTypes} from 'react';
import Avatar from 'material-ui/Avatar';
import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {grey400, cyan600, white} from 'material-ui/styles/colors';
import {typography} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Wallpaper from 'material-ui/svg-icons/device/wallpaper';
import axios from 'axios';

class OneFace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      fname: "",
      lname: "",
      face_token: props.face_token,
      onClickOneFace: props.onClick,
      avatar: props.avatar
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(name, event, value) {
    if (name === "fname") {
      this.setState({fname: value})
    } else if (name === "lname") {
      this.setState({lname: value})
    }
    // console.log("index", name);
    // console.log("event", event);
    // console.log("value", value);
  }

  onClickInner() {
    axios.post("/signup", {
      fname: this.state.fname,
      lname: this.state.lname,
      face_token: this.state.face_token,
      image: ''
    }).then(function() {
      this.state.onClickOneFace(this.state)
      this.setState({fname: "", lname: ""});
    }.bind(this)).catch(function(error) {
      console.log("there was an error", error);
    });

  }

  render() {

    const styles = {
      subheader: {
        fontSize: 24,
        fontWeight: typography.fontWeightLight,
        backgroundColor: cyan600,
        color: white
      },
      input: {
        fontSize: 18,
        fontWeight: typography.fontWeightMedium,
        color: white,
        marginLeft: 65,
        width: 200
      },
      plusButton: {
        marginLeft: 30
      },
      avatar: {
        width: 150,
        height: 150
      },
      ListItem: {
        height: 200
      }
    };

    const iconButtonElement = (
      <IconButton touch={true} tooltipPosition="bottom-left">
        <MoreVertIcon color={grey400}/>
      </IconButton>
    );

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>View</MenuItem>
      </IconMenu>
    );

    return (
      <div>
        <ListItem innerDivStyle={{
          paddingLeft: 200
        }} style ={styles.ListItem} leftAvatar={< Avatar style = {
          styles.avatar
        }
        src = {
          this.state.avatar
        } />} primaryText="UnRecognized face"/>
        <TextField style ={styles.input} id="fname" hintText="Please enter first name" value={this.state.fname} onChange={this.onChange.bind(null, "fname")}/>
        <TextField style ={styles.input} id="lname" hintText="Please enter last name" value={this.state.lname} onChange={this.onChange.bind(null, "lname")}/>
        <FloatingActionButton mini={true} style ={styles.plusButton} value="abc" onClick={this.onClickInner.bind(this)}>
          {/* this.state.onClickOneFace */}
          <ContentAdd/>
        </FloatingActionButton>
        <Divider inset={false}/>
      </div>

    );

  }

}

OneFace.propTypes = {};

export default OneFace;
