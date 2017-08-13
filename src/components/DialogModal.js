import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';

/**
 * Dialogs can be nested. This example opens a Date Picker from within a Dialog.
 */
class DialogModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }

  handleOpen() {
    console.log("here");
    this.setState({open: true});
  }

  handleClose() {
    console.log("here2");
    this.setState({open: false});
  }

  render() {
    return (
      <div>
        {/* <RaisedButton label="Dialog With Date Picker" onTouchTap={(e) => this.handleOpen(e)}/> */}
        <Dialog title="Dialog With Date Picker" actions={[< FlatButton label = "ok" onTouchTap = {
            (e) => this.handleClose(e)
          } />]} modal={false} open={this.state.open} onRequestClose={(e) => this.handleClose(e)}>
          Open a Date Picker dialog from within a dialog.
          <DatePicker hintText="Date Picker"/>
        </Dialog>
      </div>
    );
  }
}

export default DialogModal;
