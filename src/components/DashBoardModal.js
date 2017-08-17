import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

/**
 * Dialogs can be nested. This example opens a Date Picker from within a Dialog.
 */
class DashBoardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <div>
        <Dialog title="Start a Lecture"   actions={[< FlatButton label = "Start Scan" onClick = { //autoScrollBodyContent={true}
                this.props.startButtonClick
              } />]} modal={false} open={this.props.open} onRequestClose={this.props.onRequestClose}>
              <SelectField floatingLabelText="Term" value={this.props.term} fullWidth={true} onChange={this.props.onChangeModalTerm}>
                <MenuItem key={0} value='Fall' primaryText="Fall"/>
                <MenuItem key={1} value='Spring' primaryText="Spring"/>
                <MenuItem key={2} value='Summer' primaryText="Summer"/>
              </SelectField>
              <DatePicker hintText="Date Picker" defaultDate ={new Date()} onChange={this.props.onChangeModalDate}/>
            <SelectField floatingLabelText="Class" value={this.props.class} fullWidth={true} onChange={this.props.onChangeClass}>
                {/* TODO: take class from DB */}
                {this.props.classes.map((item,i) =>{
                  return( <MenuItem key={i} value={item._id} primaryText={item.name} />)
                })}
              </SelectField>
              <TextField name="SearchTime" floatingLabelText="Enter search Time" hintText="Time for search in min"  fullWidth={true} value={this.props.searchTime} onChange={this.props.onChangeModalTime}/>
            <TextField name="subject" floatingLabelText="Enter lecture name/subject"  hintText="Enter lecture name/subject"  fullWidth={true} value={this.props.lectureName} onChange={this.props.onChangeModalLectureName}/>
            </Dialog>

      </div>
    );
  }
}

export default DashBoardModal;
