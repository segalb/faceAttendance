import React, {Component} from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import DatePicker from 'material-ui/DatePicker';
import {grey400} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import PageBase from '../components/PageBase';
import axios from 'axios';

class FormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      term: '',
      year: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(e);
    console.log(this.state.name)
    axios.post("/addClass", {
      name: this.state.name,
      faceSet: '1',
      term: this.state.term,
      year: this.state.year
    }).then(function(response) {
      console.log(response);
    }).catch(function(error) {
      console.log(error);
    });
  }

  onChange(e) {
    var obj = {};
    console.log(e.target.name);
    console.log(e.target.value);
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }

  handleChange(name, event, index, value) {
    var obj = {};
    obj[name] = value
    console.log(obj);
    this.setState(obj);
  }

  render() {
    const styles = {
      toggleDiv: {
        maxWidth: 300,
        marginTop: 40,
        marginBottom: 5
      },
      toggleLabel: {
        color: grey400,
        fontWeight: 100
      },
      buttons: {
        marginTop: 30,
        float: 'right'
      },
      saveButton: {
        marginLeft: 5
      }
    };

    const {name, term, year} = this.state;
    return (
      <PageBase title="Add new Class" navigation="Application / Add new Class">
        <form onSubmit={this.onSubmit}>

          <TextField name="name" hintText="Name" floatingLabelText="Name" fullWidth={true} value={name} onChange={this.onChange}/>

          <SelectField name="term" floatingLabelText="Term" value={term} fullWidth={true} onChange={this.handleChange.bind(this, 'term')}>
            <MenuItem key={0} value='Fall' primaryText="Fall"/>
            <MenuItem key={1} value='Spring' primaryText="Spring"/>
            <MenuItem key={2} value='Summer' primaryText="Summer"/>
          </SelectField>

          <SelectField name="year" floatingLabelText="Year" value={year} fullWidth={true} onChange={this.handleChange.bind(this, 'year')}>
            <MenuItem key={0} value='2017' primaryText="2017"/>
            <MenuItem key={1} value='2018' primaryText="2018"/>
            <MenuItem key={2} value='2019' primaryText="2019"/>
          </SelectField>

          {/* <DatePicker hintText="Expiration Date" floatingLabelText="Expiration Date" fullWidth={true}/>

        <div style={styles.toggleDiv}>
          <Toggle label="Disabled" labelStyle={styles.toggleLabel}/>
        </div> */}

          <Divider/>

          <div style={styles.buttons}>
            <Link to="/">
              <RaisedButton label="Cancel"/>
            </Link>

            <RaisedButton label="Save" style={styles.saveButton} type="submit" primary={true}/>
          </div>
        </form>
      </PageBase>
    );
  }
}

export default FormPage;
