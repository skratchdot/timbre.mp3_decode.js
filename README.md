# timbre.mp3_decode.js

Currently you can only decode mp3s with timbre.js in Node.  This plugin
allows you to decode mp3s in the browser using [jsmad]().

I've included source and minified versions of jsmad in this repo.

## Dependencies

- [timbre.js]()

- [jsmad]()


## Usages

```html
	<script src="jsmad.js"></script>
	<script src="timbre.js"></script>
	<script src="timbre.mp3_decode.js"></script>
	<script>
		T('audio').loadthis('test.mp3', function() {
		  this.play();
		}).on('ended', function() {
		  this.pause();
		});
	</script>
```

