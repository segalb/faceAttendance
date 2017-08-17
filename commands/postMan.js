//Create the face set - only one time:
      // if(faceSet){
      //   request.post({
      //     url: API_URL + 'faceset/create',
      //     form: {
      //       'api_key': API_KEY,
      //       'api_secret': API_SECRET,
      //       'display_name': "Horizons Students Summer 2017",
      //       'outer_id': '1'
      //           }
      //   }, function(error, response, body) {
      //       console.log("Added faceSet");
      //       console.log('body', body);
      //   });
      // }

//add face to data set
      // if (!faceSet) {
      //   request.post({
      //     url: API_URL + 'faceset/addface',
      //     form: {
      //       'api_key': API_KEY,
      //       'api_secret': API_SECRET,
      //       'face_tokens': "350522cddc23054c17848307a92ac7b5",
      //       'outer_id': '1'
      //     }
      //   }, function(error, response, body) {
      //     console.log("Added face to horizones face set");
      //     console.log('body', body);
      //   });
      // }


//rTsp Links:

        //rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov
        //rtsp://freja.hiof.no:1935/rtplive/_definst_/hessdalen03.stream
        //rtsp://admin:b12345678@10.2.107.121:80/cam/realmonitor?channel=1&subtype=0
        //local host rtsp://admin:b12345678@10.2.107.77:80/cam/realmonitor?channel=1&subtype=0
        //rtsp://admin:b12345678@10.2.107.121:554/cam/realmonitor?channel=1&subtype=0


//Using gm for croping and reading image from file to buffer.

        //  var buf = require('fs').readFileSync('./camera/frames/camera-screenshot_1501021011645.jpg');

        // var d = gm(buf, "output.jpg").crop(145, 145, 259, 147);
        // gm(buf, 'image.jpg').crop(145, 145, 259, 147).toBuffer('jpg', function(err, buffer) {
        //   console.log(buffer);
        //   wsocket.emit('data', buffer);
        // })

        // gmToBuffer(d).then(function(buffer) {
        //   // console.log(buffer);
        //
        // })


        <DashBoardModal startButtonClick= {(e) => this.handleCloseModal(e)}
            open= {this.state.dialogOpen}
            onRequestClose ={(e) => this.handleCloseModal(e)}
            term={this.state.term}
            onChangeModalTerm= {this.handleChangeModalTerm.bind(this)}
            onChangeModalDate= {this.handleChangeModalDate.bind(this)}
            class = {this.state.class}
            onChangeClass = {this.handleChangeModal.bind(this)}
            classes= {this.state.classes}
            searchTime = {this.state.searchTime}
            onChangeModalTime = {this.handleChangeModalTime.bind(this)}
            lectureName = {this.state.lectureName}
            onChangeModalLectureName = {this.handleChangeModalLectureName.bind(this)}
          />



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
