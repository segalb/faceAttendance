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

- [ ] Mercury
- [x] Venus
- [x] Earth (Orbit/Moon)
- [x] Mars
- [ ] Jupiter
- [ ] Saturn
- [ ] Uranus
- [ ] Neptune
- [ ] Comet Haley




1. Display array ```roster``` as a nested list, as in the picture. Use the provided classes in a way that makes sense - make sure that you use keys for both mappings, and that the keys are unique!

	Use Codepen [here](https://codepen.io/rick-shar/pen/JNVejw)

	![](./img/lists-2.png)


## Forms in React

### [Watch Me](https://vimeo.com/223236408)

Use Codepen [here](https://codepen.io/rick-shar/pen/EmJGvP)

![](https://d3vv6lp55qjaqc.cloudfront.net/items/1O0q242P3x222U2E3G3V/Screen%20Shot%202017-05-26%20at%208.05.19%20PM.png?v=f4e5511c)

1. Create a React Form that enforces validation on the email and password fields. The email must have at least 3 characters before the '@' and the password must have a minimum of 4 characters that contain at least 1 number and at least 1 letter.


## State, Lifecycle Hooks

### [Watch Me 1](https://vimeo.com/223236502)
### [Watch Me 2](https://vimeo.com/223236748)

1. In the Codepen below utilize the correct lifecycle hook and ajax to grab data (using ajax GET) from URL: https://api.myjson.com/bins/rztih .

	Use Codepen [here](https://codepen.io/rick-shar/pen/BRezxW)

<details>
<summary>Should look like this (Warning: Cuteness overload) </summary>

  ![](https://d3vv6lp55qjaqc.cloudfront.net/items/3N3I0h3i3q1a3N43121G/Screen%20Recording%202017-05-27%20at%2006.51%20PM.gif?v=20b26c27)

</details>


1. A local Squirrel sleeps or wakes up whenever it is poked. While it is awake, it collects nuts to survive. You are given a function, ```gather```, as a prop. Using only lifecycle functions and a timer, make it so that the Squirrel component only "gathers" nuts while it is awake (the Squirrel component is mounted when woken and unmounted when asleep).

	Use Codepen [here](https://codepen.io/josephch405/pen/qmwQmG?editors=1010)

	![](./img/lifecycle-2.gif)

## Immutability


### [Watch Me 1](https://vimeo.com/223237457)
### [Watch Me 2](https://vimeo.com/223237595)
### [Watch Me 3](https://vimeo.com/223237726)
### [Watch Me 4](https://vimeo.com/223237765)
### [Watch Me 5](https://vimeo.com/223237808)


Replace the commented pieces of code in each of the snippets below to no longer cause a mutation of `myVar`. Do so without changing the output of the program.


Note: The official MDN documentation for [Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) and [Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) has a handy list of available functions on the left sidebar.


1. Adding to an array
    ```javascript
      var myVar = [1, 2, 3];

      myVar.push(4); // Mutation

      console.log(myVar);
      // Output: [1, 2, 3, 4]
    ```
1. Removing from the end of an array
    ```javascript
      var myVar = [1, 2, 3];

      myVar.pop(); // Mutation

      console.log(myVar);
      // Output: [1, 2]
    ```
1. Removing from the middle of an array
    ```javascript
      var myVar = [1, 2, 3, 4, 5];

      myVar.splice(2, 1); // Mutation

      console.log(myVar);
      // Output: [1, 2, 4, 5]
    ```
1. Changing each entry in an array
    ```javascript
      var myVar = [1, 2, 3];

      for (var i = 0; i < myVar.length; i++) {
        myVar[i] = myVar[i] * 10
      } // Mutation

      console.log(myVar);
      // Output: [10, 20, 30]
    ```
1. Array of arrays (2D array)
    ```javascript
      // Be careful not to mutate the outer array
      // OR any of the inner arrays
      var myVar = [
        [1, 2, 3],
        [4, 0, 6],
        [7, 8, 9]
      ];

      myVar[1][1] = 5; // Mutation

      console.log(myVar);
      // Output: [
      //  [1, 2, 3],
      //  [4, 5, 6],
      //  [7, 8, 9]
      // ]
    ```
1. Add/change an object key
    ```javascript
      var myVar = { a: 10, b: 15 };

      myVar.b = 20; // Mutation
      myVar.c = 30; // Mutation

      console.log(myVar);
      // Output: { a: 10, b: 20 , c: 30 }
    ```
1. Remove an object key
    ```javascript
      // This one might be tricky
      var myVar = { a: 10, b: 15 };

      delete myVar.b;

      console.log(myVar);
      // Output: { a: 10 }
    ```



 Todo:
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

## face tokens and face sets

1.
2.
