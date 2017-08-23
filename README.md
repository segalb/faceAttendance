# Tend - take attendance based on face detection

## Product

### [Live explanation](https://vimeo.com/223236338)

1. Tend is a system that soppused to make professor life easier when taking attendance for classes. Tend builds a reporpt per lecture and summary for the all semester ```per student```. in the future the system will find a corelation between students that attend classes and students that noramllay are missing classes and thier grades.

2. Here is the work flow of the system and some photos from a live Demo.

### Main Screen
 ![](./readmeImg/main.jpg)

### Main screen - unrecognized faces and users in class
 ![](./readmeImg/main2.jpg)

### Professor can always add new classes  
![](./readmeImg/add_Class.jpg)

### Attendance Per Lecture View
 ![](./readmeImg/attendance_Per_Lecture.jpg)

###  Attendance per lecture students list
![](./readmeImg/Attendance_Per_Lecture_Students_List.jpg)

### Semester summary per student
 ![](./readmeImg/Semester_summary_per_student.jpg)

### Semester summary per student - Lecture analysis
 ![](./readmeImg/Semester_summary_per_student_analysis.jpg)


### Todo

- [ ] Smaller photos
- [ ] More info on the process
- [ ] Process .env.sh - for Api Keys
- [ ] JTX-2
- [ ] ```Neural network face net```
- [ ] Room per name space (camera address)
- [ ] Build movement - slider
- [ ] RFID - algo based on location




<details>
<summary>Should look like this (Warning: Cuteness overload) </summary>

  ![](https://d3vv6lp55qjaqc.cloudfront.net/items/3N3I0h3i3q1a3N43121G/Screen%20Recording%202017-05-27%20at%2006.51%20PM.gif?v=20b26c27)

</details>


### Todo:
1. Calibration Cycle:
    - Find images of users based on the users in the rooms based on RFID TAGS and anchors
    - Figure out how to do this if we don't have the RFID functionality
2. Electrical cycle :
    - Control the electrical integration :
      - XYZ motors platform
      - what kind of camera do you use
3. face recognition and Identification:
    - Choice: FacePlusPlus
    - Future possible:
      - meerkat
      - sighthound
4. RFID :
    - Build work Flow

## Hardware:

 - Slider -
    - main slider : https://www.amazon.com/gp/product/B00LX1ERNQ/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B00LX1ERNQ&linkCode=as2&tag=maxmak05-20&linkId=377d849964ba2e0c19ad4e6d235a3194
    - second option :
    https://www.amazon.com/Koolertron-Aluminum-Shooting-Stabilization-Camcorders/dp/B01GR6HDU0/ref=sr_1_54?s=photo&ie=UTF8&qid=1500325685&sr=1-54&keywords=camera+slider


## Buying List:
  - Slider : https://www.amazon.com/gp/product/B00LX1ERNQ/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B00LX1ERNQ&linkCode=as2&tag=maxmak05-20&linkId=377d849964ba2e0c19ad4e6d235a3194
  - Camera :
  - control board :
  - Stepper-motor:https://www.amazon.com/gp/product/B00PNEQI7W/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B00PNEQI7W&linkCode=as2&tag=maxmak05-20&linkId=fc5717f3025fb194df251bc287dc235b
  - Battery -
  -
  Stepper-Driver:https://www.amazon.com/gp/product/B01FFFYVV8/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B01FFFYVV8&linkCode=as2&tag=maxmak05-20&linkId=b5af4f56ec2358efc837515cda83ed5a
  - polly:https://www.amazon.com/gp/product/B01GTFTMRG/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B01GTFTMRG&linkCode=as2&tag=maxmak05-20&linkId=e5fd2f7c589da7a95ca6abfbcfc97a56

## Assignments till hardware is coming:
1. Finish basic control panel in redux (click, start, stop and so on.).
2. Build face recoginition on response from face++ and return to front End
3. Face compare, build algo and check for face, build the algo on the normal front end
4. add compnent for teacher.
5. when hardware come build control left right and up down.
6. build slider
7. build flow

## Code Case and building instruction

https://computers.tutsplus.com/tutorials/motion-control-with-arduino-motorising-a-camera-slider--cms-21539

http://www.instructables.com/id/Make-a-Motorized-Camera-Slider/

https://blog.arduino.cc/2017/03/24/build-a-motorized-gimbal-on-a-budget-with-arduino/



## Facedetection

https://facedetection.com/software/

## Installation

Provide code examples and explanations of how to get the project.

## API Reference

Depending on the size of the project, if it is small and simple enough the reference docs can be added to the README. For medium size to larger projects it is important to at least provide a link to where the API reference docs live.

## Tests

Describe and show how to run the tests with code examples.

## Contributors

Let people know how they can dive into the project, include important links to things like issue trackers, irc, twitter accounts if applicable.

## License

A short snippet describing the license (MIT, Apache, etc.)
