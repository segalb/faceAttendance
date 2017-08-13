import React, {PropTypes} from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

import {grey400, cyan600, white} from 'material-ui/styles/colors';
import {typography} from 'material-ui/styles';
import Wallpaper from 'material-ui/svg-icons/device/wallpaper';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import OneFace from './OneFace'

class UnRecognizedStudent extends React.Component {
  constructor(props) {
    super(props);
    const {data, name, refClick} = props;
    this.state = {
      data,
      name,
      refClick
    };
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
      }
    };

    return (
      <Paper>
        <List>
          <Subheader style={styles.subheader}>{this.state.name}</Subheader>
          {this.props.data.map((item, i) => <div key={i}>
            <OneFace id={item.id} onClick={this.state.refClick} face_token={item.face_token} avatar={item.avatar}/>
          </div>)}
        </List>
      </Paper>
    );

  }
}

UnRecognizedStudent.propTypes = {
  data: PropTypes.array,
  name: PropTypes.string
};

export default UnRecognizedStudent;
