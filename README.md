# Tend - take attendance based on face detection

## Product

### [Live explanation](www.)

1. Tend is a system that soppused to make professor life easier when taking attendance for classes. Tend builds a reporpt per lecture and summary for the all semester ```per student```. in the future the system will find a corelation between students that attend classes and students that noramllay are missing classes and thier grades.

2. Here is the work flow of the system and some photos from a live Demo.


### Main screen

  ![](./readmeImg/main.jpg)


 <details>
 <summary>Main screen - unrecognized faces and users in class  </summary>

 ![](./readmeImg/main2.jpg)

 </details>

 <details>
 <summary>Professor can always add new classes   </summary>

![](./readmeImg/add_Class.jpg)

 </details>

 <details>
 <summary>Attendance Per Lecture View</summary>

 ![](./readmeImg/attendance_Per_Lecture.jpg)

 </details>


 <details>
 <summary>Attendance per lecture students list</summary>

![](./readmeImg/Attendance_Per_Lecture_Students_List.jpg)

 </details>

 <details>
 <summary>Semester summary per student</summary>

 ![](./readmeImg/Semester_summary_per_student.jpg)

 </details>

 <details>
 <summary>Semester summary per student - Lecture analysis</summary>

 ![](./readmeImg/Semester_summary_per_student_analysis.jpg)

 </details>


### Todo

- [ ] Smaller photos
- [ ] More info on the process
- [ ] Process .env.sh - for Api Keys
- [ ] JTX-2
- [ ] ```Neural network face net```
- [ ] Room per name space (camera address)
- [ ] Build movement - slider
- [ ] RFID - algo based on location

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
5. Front end - move code to Redux - one state management


## Hardware:

     - Slider -
        - main slider : https://www.amazon.com/gp/product/B00LX1ERNQ/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B00LX1ERNQ&linkCode=as2&tag=maxmak05-20&linkId=377d849964ba2e0c19ad4e6d235a3194
        - Camera :
        - Micro - controller:
        - Stepper-motor: https://www.amazon.com/gp/product/B00PNEQI7W/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B00PNEQI7W&linkCode=as2&tag=maxmak05-20&linkId=fc5717f3025fb194df251bc287dc235b
        - Battery -
        -  Stepper-Driver:
        https://www.amazon.com/gp/product/B01FFFYVV8/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B01FFFYVV8&linkCode=as2&tag=maxmak05-20&linkId=b5af4f56ec2358efc837515cda83ed5a
        - Polly:
        https://www.amazon.com/gp/product/B01GTFTMRG/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B01GTFTMRG&linkCode=as2&tag=maxmak05-20&linkId=e5fd2f7c589da7a95ca6abfbcfc97a56

## Code Case and building instruction - for hardware

https://computers.tutsplus.com/tutorials/motion-control-with-arduino-motorising-a-camera-slider--cms-21539

http://www.instructables.com/id/Make-a-Motorized-Camera-Slider/

https://blog.arduino.cc/2017/03/24/build-a-motorized-gimbal-on-a-budget-with-arduino/

## Installation

1. run npm Installation
2. make sure the ip camera is mjpeg stream and change source env.sh with the new ip

## API Reference

1. Face Detection neural network is based at the moment on face++

- https://www.faceplusplus.com/

- Other options:
  https://facedetection.com/software/

## Contributors


## License
  MIT license
