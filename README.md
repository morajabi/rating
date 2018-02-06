# Rating Modal

This is an implemention of a rating modal that asks users how likely are they to recommend the product/app to their friends. _Note: The modal only opens if user hasn't rated nor closed the modal before, as it's the real world behaviour. Otherwise, you can start a new session with the top left button._

## Technologies Used

This project is created by the awesome `create-react-app`.

* **React**
* **Jest** as a testing framework (it's pre-installed with react-scripts) together with **Enzyme** and **redux-saga-tester** for more efficient saga testing [2]
* **Redux** with duck/modules style structure for better scaling
* **Redux-Saga** for handling async redux actions
* **Reselect** for scalable and performant access to redux state
* **Immer** to update state in reducers with a maintainable and eaier to read approach
* **styled-components** for styling in a way that is component-based structure friendly and scalable

> Note: I didn't disable logs, so it's easier to see what's happening for you when testing.

> [2] Note: This project is not fully covered by tests, there are some basic tests as an example, only.

## How can we reduce bundle size?

Analyzing codebase, swapping dependencies, tweaking configs, reducing the bundle, validating result, and iterating this process can be a tedious task.

You need to keep in mind that no reducing bundle size technique would work for every project and codebase. There's no one-size-fits-all "secert" to make it happen, it's about testing. Sometimes you'll just make it worse too and you need to revert back!

### 1. Check dependencies

There might be lighter alternative dependencies to use which you can take advantage of and reduce your bundle size. For example we could save some bytes by using `preact` or `preact-compat` instead of `react`.

Also, sometimes a package might be for more complex use cases, thus it'd be fat in size. So when you don't need the extra logic, you might be able to simply write a utility function/class or again, find an alternative.

We can use the super useful `webpack-bundle-analyzer` to check all depenecies in a nice UI.

### 2. Code Spliting

With dynamic imports, we can either split code at the component-level or by routes (e.g. with react-router).

Luckily, it's supported by CRA. For this small app, it was not necessary and we can't gain much from this method, but if it was a larger app (like a user panel) we could take advantage of this and dynamically import modules/chunks.

### 3. Tweak configs

Tweaking UglifyJS parameters might give you a smaller bundle size.

Enabling some Webpack plugins are also helpful. Although we can't really take advantage of this without ejecting or customizing `react-scripts` here.

### ...

and some other little things to check, including:

* Deploying in `production` mode and optimising source map info
* Opimize inline SVGs with SVGO
* Using latest version of packages (they're constantly working to reduce their bundle size too, like React 16 vs React 15)
* Using React Fragments

---

It's good point this out that bundle size, is not the only way to have a faster "first meaningful point" in the user's browser, although it has a big impact. Every piece of JS you write can be optimized right from the moment you write them.

Factors like "parse time" have a noticable impact on that. There's a good article on ["JavaScript start-up performance" by Addy Osmani](https://medium.com/reloading/javascript-start-up-performance-69200f43b201) which I found useful (You may want to read the "Read More" section articles too!)

Also, don't forget the code is gonna be maintained by humans not bundlers! Sometimes I won't sacrifice developer experince for a couple of bytes! I'd thank myself later! 😉

## Stretch goals (AKA What I'd do next)

### Use React Portals for rendering the modal

We may need to use React 16 Portals feature to render modal, when a parent container is clipping the modal.

More information with a real world example: https://www.nearform.com/blog/exploring-react-portals/

### Write unit tests for action creators -> reducers -> selectors

A bigger codebase with more actions and therefore more complicated store architecture would require at least basic unit testing to ensure the flow is working as intended.

It also gives you more confidence in refactoring the state shape as an example.

### May use `react-modal` to handle more edge cases if more features added

If we needed to manage focus more complicated or we want to use React Portals without head ache, we could simply use `react-modal`. (Note that it'd increase bundle size by some kilobytes)
