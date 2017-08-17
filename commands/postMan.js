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
