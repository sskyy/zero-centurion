# zero-bus #

There is a super event emitter class named `Bus` in zero core.
This module will create a `Bus` instance and attach it to every request instance. You can use it via `req.bus`.

## Usage ##

1. Add dependency to your module package.json file like:

```
{
	"name" : "YOUR_MODULE_NAME",
	"zero" : {
		"dependencies" : {
			"bus" : "^0.0.1"
		}
	}
}
```

2. Declare the event you want to listen in module.exports like:

```
module.exports = {
	listen : {
       'someEvent' : function eventHandler(/*arguments of fired event*/){

       }
    }
}
```

3. Or you can use it in router handler like code below, don't forget declare module dependency in package.json first.

```
module.exports = {
	route ： {
		'/route/:param' : function(req){
			req.bus.fire('someEvent', arg1, arg2)
		}
	}
}
```

## Advanced Usage ##

### Ordering listeners ###

You can specify the fire order of all listeners on certain event using:

```
bus.on({
	"event":'someEvent',
	"function":function handlerName(){},
	"module":"otherModule"
})

bus.on({
	"event":'someEvent',
	"function":function handler(){},
	"order":{before:"otherModule.handlerName"}, //make this handler triggered before the one above
	"module":"someModule"
})
```

### sharing data through bus ###

You can use `bus.data()` to store and retrieve data.

```
bus.data('user',{id:1,name:'zero'}) //set data
bus.data('user') //retrieve data

//advanced usage
bus.data('user.id',2) //this will set the id of the object named `user` to 2, instead of creating a new piece of data named 'user.id'.
```


### keeping trace stack of event ###

As you may know, bus can trace event stack in debug mode, but there are some basic rules you need to know first:

 - If you fired another event synchronously(such as in a promise) in your event handler, you need to return a promise that holds the result of the event you fired. Mostly simply return `bus.fire('someEvent')`( the return value of bus.fire() is a promise) would just work. 
 
 - Returning `bus.error()` will stop all event processing immediately.
 - Handlers on same event run `synchronously`, which means if you are doing something synchronously( such as connecting database ) in a event handler, other handlers attached on the same event won't wait, unless you return a promise with attribute `block` set to `true`.

