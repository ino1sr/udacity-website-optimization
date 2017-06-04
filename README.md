## Website Performance Optimization portfolio project

This Website Optimization project is part of the [Udacity Front-End Web Developer Nanodegree][1] program and the challenge is to optimize an online portfolio for speed! In particular, optimize the critical rendering path and make the page render as quickly as possible by applying the techniques you've picked up in the [Critical Rendering Path course][2].

### Part 1: Optimize PageSpeed Insights score for index.html

#### Goal

`index.html` achieves a PageSpeed score of at least 90 for Mobile and Desktop.

#### Optimizations applied

- With Gulp tasks:
  - Optimize images.
  - Minify HTML, CSS and JavaScript.
  - Inline critical-path CSS.
- Unblock CSS for print with Media Queries.
- Defer parser-blocking JavaScript.
- Use Web Font Loader to load Google font asynchronously.

### Part 2: Optimize Frames per Second in pizza.html

#### Goal

1. Optimizations made to `views/js/main.js` make `views/pizza.html` render with a consistent frame-rate at 60fps when scrolling.
2. Time to resize pizzas is less than 5 ms using the pizza size slider on the views/pizza.html page. Resize time is shown in the browser developer tools.

#### Optimizations applied

- Remove function determineDx and merge function sizeSwitcher into changePizzaSizes.
- Declare a variable with selected elements and move it outside of the loop.
- Read layout properties outside of the loop to avoid Forced Synchronous Layout.
- Update `querySelector`/`querySelectorAll` to `getElementById`/`getElementsByClassName` which are faster.
- Optimize scroll event with requestAnimationFrame.
- Reduce the number of pizza images appended to the backgroud.

### How to run the application

Check the live version of the optimized portfolio [here][3].

**OR**

1. Clone or download this repository.

2. Go to the root of the project directory and install all dependencies:

```
$ npm install
```

3. Run the tasks in `gulpfile.js`:

```
$ gulp
```

This will create a `dist` folder with optimized code.

4. Run a local server.

```bash
 $ http-server -p 8080
```

5. Open a browser and visit `http://localhost:8080`.

6. If you need to make this project visible to the outside, you may run `ngrok`.

  ``` bash
 $ ./ngrok http 8080
  ```

[1]: https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001
[2]: https://www.udacity.com/course/ud884
[3]: https://ino1sr.github.io/udacity-website-optimization/dist/index.html
