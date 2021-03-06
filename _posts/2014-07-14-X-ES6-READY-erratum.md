---

layout: post
title: Erratum, Get ready for ECMAScript 6
info : Erratum, Get ready for ECMAScript 6

---

***ERRATUM:***
*This an update of a previous post: [Get ready for ECMAScript 6](http://k33g.github.io/2014/06/26/ES6-READY.html). During my investigation, I realized that there was an easier way to "make ECMAScript 6. The update  concerns only the use of bower and the Javascript references in html pages.*

*There is no impact about the next post: [ECMAScript 6 in action with the inheritance and the models](http://k33g.github.io/2014/07/05/ES6-IN-ACTION-WITH-MODELS.html).*

#Get ready for ECMAScript 6

JavaScript evolves, and the next 6th version will be awesome, we'll have many great things like classes, maps, modules, ... (probably much more, but I'm just starting to learn).
There are several ways to begin writing ES6 source code (even now with shims, polyfills and transpilers), you can find a tools list here [https://github.com/addyosmani/es6-tools](https://github.com/addyosmani/es6-tools).

I chose the simplest method to begin (to my mind) : no grunt task to transpile ES6 to ES5 or ES3, just some shims in the browser. But you'll still need a web server (http server). Personally I use a node script with Express, but  other solution should be good like python command `python -m SimpleHTTPServer`.

*PS: you need bower for install shims. (and node and npm of course).*

**Caution:** I try to improve my english, I hope this post will be understandable, but don't hesitate to correct me (please).

##Prepare the project

In a directory (ie: `es6-project`) create 4 files:

- `.bowerrc`
- `bower.json`
- `package.json` (to declare Express dependencies)
- `app.js `(our http server)

with these contents:

###.bowerrc

{% highlight javascript %}
{
  "directory": "public/bower_components"
}
{% endhighlight %}

###bower.json

***This is an update of the previous post: we only need of traceur.js***

{% highlight javascript %}
{
  "name": "es6-project",
  "version": "0.0.0",
  "dependencies": {
    "uikit": "~2.8.0",
    "jquery": "~2.1.1",
    "traceur": "~0.0.49"
  },
  "resolutions": {
    "jquery": "~2.1.1"
  }
}
{% endhighlight %}

*Remark: uikit isn't mandatory, it is only for pretty pages.*

###package.json

{% highlight javascript %}
{
  "name": "es6-project",
  "description" : "es6-project",
  "version": "0.0.0",
  "dependencies": {
    "express": "4.1.x",
    "body-parser": "1.0.2"
  }
}
{% endhighlight %}

###app.js

{% highlight javascript %}
var express = require('express')
  , http = require('http')
  , bodyParser = require('body-parser')
  , app = express()
  , http_port = 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.listen(http_port);
console.log("Listening on " + http_port);
{% endhighlight %}

###And now install all of this!

- to download es6 shims: type `bower install`
- to install Express: type `npm install`

That's all. Now, you should have something like this:

    es6-project/
    ├── node_modules/
    ├── public/   
    |   └─── bower_components/     
    ├── .bowerrc
    ├── bower.json
    ├── package.json    
    └── app.js

Create a `js` directory, with an `app` sub-directory in `public`, and a `main.js` file in `app` directory and an `index.html` file in `public`:

    es6-project/
    ├── node_modules/
    ├── public/   
    |   ├── bower_components/  
    |   ├── js/          
    |   |   └── app/
    |   |        └── main.js
    |   └── index.html
    ├── .bowerrc
    ├── bower.json
    ├── package.json    
    └── app.js

###Some code

####Prepare html

Modifiy `index.html` like that:

***This is an update of the previous post: we only need of traceur.js***


{% highlight html %}
<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title>es6-project</title>
  <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" />
  <link rel="icon" sizes="196x196" href="html5.png">
  <meta name="mobile-web-app-capable" content="yes">
  <link rel="stylesheet" href="bower_components/uikit/dist/css/uikit.almost-flat.min.css" />
</head>

<body style="padding: 20px">
  <h1></h1>

  <script src="bower_components/jquery/dist/jquery.min.js"></script>
  <script src="bower_components/traceur/traceur.js"></script>

</body>
</html>
{% endhighlight %}

####Application class

We are going to write our first ES6 class. So in the `main.js` file, type this content:

{% highlight javascript %}
class Application {

  constructor () {
    $("h1").html("E6 rocks!")
  }

}

$(() => {
  new Application();
});
{% endhighlight %}

This is our main class, the first "thing" that will be run in our webapp.

####"Ignition"

We need to declare our main class in `index.html`, just add this after scripts declarations:

{% highlight html %}
<script>
  System.import('js/app/main');
</script>
{% endhighlight %}

So, your `index.html` should look like to this:

***This is an update of the previous post: we only need of traceur.js***

{% highlight html %}
<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title>es6-project</title>
  <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" />
  <link rel="icon" sizes="196x196" href="html5.png">
  <meta name="mobile-web-app-capable" content="yes">
  <link rel="stylesheet" href="bower_components/uikit/dist/css/uikit.almost-flat.min.css" />
</head>

<body style="padding: 20px">
  <h1></h1>

  <script src="bower_components/jquery/dist/jquery.min.js"></script>
  <script src="bower_components/traceur/traceur.js"></script>

  <script>
    System.import('js/app/main');
  </script>
</body>
</html>
{% endhighlight %}

You can now check that everything works:

- run Express application: `node app.js`
- open [http://localhost:3000](http://localhost:3000) with your brower.

Hopefully, you shoul obtain a "very nice" message `E6 rocks!`.

Now you have a "running" project and you can go deeper.

##Go deeper: more classes

Create a `models` directory in `publix/js/app` with two new JavaScript files inside `human.js` and `humans.js`:

    es6-project/
    ├── node_modules/
    ├── public/   
    |   ├── bower_components/  
    |   ├── js/          
    |   |   └── app/
    |   |        ├── models/
    |   |        |   ├── human.js    
    |   |        |   └── humans.js   
    |   |        └── main.js
    |   └── index.html
    ├── .bowerrc
    ├── bower.json
    ├── package.json    
    └── app.js

###Human class

Imagine Human class as a kind of model:

{% highlight javascript %}
class Human {

  constructor (args) {
    this.id = args.id;
    this.firstName = args.firstName;
    this.lastName = args.lastName;
  }
}

export default Human;
{% endhighlight %}

*`export` keyword is very important, we "expose" Human class, so we can declare/load it from other JavaScript files.*

###Humans class

We could say that Humans class is a collection of human's models:

{% highlight javascript %}
class Humans {

  constructor () {
    this.models = [];
  }

  add (human) {
    this.models.push(human);
  }
}

export default Humans;
{% endhighlight %}

###Using Human and Humans in Application class

We need to declare our 2 classes to use them. You have to use `import` keyword:

{% highlight javascript %}
import Human from './models/human';
import Humans from './models/humans';
{% endhighlight %}

And now, you can instantiate models and collections:

{% highlight javascript %}
var bob = new Human({id: 1, firstName:'Bob', lastName:'Morane'});
var john = new Human({id: 2, firstName:'John', lastName:'Doe'});

var humans = new Humans();

humans.add(bob);
humans.add(john);
{% endhighlight %}

And if you want to display the collection content, before add `<ul></ul>` in the body of `index.html` and write this JavaScript code to populate the list (`<ul></ul>`):

{% highlight javascript %}
$("ul").html(humans.models.reduce(function(previous, current) {
  return previous + `
    <li>${current.id} ${current.firstName} ${current.lastName}</li>
  `;
},""));
{% endhighlight %}

**Remark**:String interpolation (as with Coffeescript) is a very handy feature of ES6, note the use of the symbol **`** (back ticks) instead of double or single quotes to declare a "template string".

So at the end, you Application should look like this:

{% highlight javascript %}
import Human from './models/human';
import Humans from './models/humans';

class Application {

  constructor () {
    $("h1").html("E6 rocks!")

    var bob = new Human({id: 1, firstName:'Bob', lastName:'Morane'});
    var john = new Human({id: 2, firstName:'John', lastName:'Doe'});

    var humans = new Humans();

    humans.add(bob);
    humans.add(john);

    $("ul").html(humans.models.reduce((previous, current) => {
      return previous + `
        <li>${current.id} ${current.firstName} ${current.lastName}</li>
      `;
    },""));

  }
}

$(() => {
  new Application();
});
{% endhighlight %}

You have now a functional ECMAScript 6 project, you can play!

