// kynd.info 2014

function openSideNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}


 var keyData = {
 	q: {
		sound: new Howl({
  		src: ['sounds/A/bubbles.mp3']
		}),
		color: '#1abc9c'
	},
	w: {
		sound: new Howl({
  		src: ['sounds/A/clay.mp3']
		}),
		color: '#2ecc71'
	},
	e: {
		sound: new Howl({
  		src: ['sounds/A/confetti.mp3']
		}),
		color: '#3498db'
	},
	r: {
		sound: new Howl({
  		src: ['sounds/A/corona.mp3']
		}),
		color: '#9b59b6'
	},
		t: {
		sound: new Howl({
  		src: ['sounds/A/dotted-spiral.mp3']
		}),
		color: '#34495e'
	},
	y: {
		sound: new Howl({
  		src: ['sounds/A/flash-1.mp3']
		}),
		color: '#16a085'
	},
	u: {
		sound: new Howl({
  		src: ['sounds/A/flash-2.mp3']
		}),
		color: '#27ae60'
	},
	i: {
		sound: new Howl({
  		src: ['sounds/A/flash-3.mp3']
		}),
		color: '#2980b9'
	},
	o: {
		sound: new Howl({
		src: ['sounds/A/glimmer.mp3']
		}),
		color: '#8e44ad'
	},
	p: {
		sound: new Howl({
  		src: ['sounds/A/moon.mp3']
		}),
		color: '#2c3e50'
	},
	a: {
		sound: new Howl({
  		src: ['sounds/A/pinwheel.mp3']
		}),
		color: '#f1c40f'
	},
	s: {
		sound: new Howl({
  		src: ['sounds/A/piston-1.mp3']
		}),
		color: '#e67e22'
	},
		d: {
		sound: new Howl({
  		src: ['sounds/A/piston-2.mp3']
		}),
		color: '#e74c3c'
	},
	f: {
		sound: new Howl({
  		src: ['sounds/A/prism-1.mp3']
		}),
		color: '#95a5a6'
	},
	g: {
		sound: new Howl({
  		src: ['sounds/A/prism-2.mp3']
		}),
		color: '#f39c12'
	},
	h: {
		sound: new Howl({
  		src: ['sounds/A/prism-3.mp3']
		}),
		color: '#d35400'
	},
	j: {
		sound: new Howl({
  		src: ['sounds/A/splits.mp3']
		}),
		color: '#1abc9c'
	},
	k: {
		sound: new Howl({
  		src: ['sounds/A/squiggle.mp3']
		}),
		color: '#2ecc71'
	},
	l: {
		sound: new Howl({
  		src: ['sounds/A/strike.mp3']
		}),
		color: '#3498db'
	},
	z: {
		sound: new Howl({
  		src: ['sounds/A/suspension.mp3']
		}),
		color: '#9b59b6'
	},
	x: {
		sound: new Howl({
  		src: ['sounds/A/timer.mp3']
		}),
		color: '#34495e'
	},
	c: {
		sound: new Howl({
  		src: ['sounds/A/ufo.mp3']
		}),
		color: '#16a085'
	},
	v: {
		sound: new Howl({
  		src: ['sounds/A/veil.mp3']
		}),
		color: '#27ae60'
	},
	b: {
		sound: new Howl({
  		src: ['sounds/A/wipe.mp3']
		}),
		color: '#2980b9'
	},
	n: {
		sound: new Howl({
		src: ['sounds/A/zig-zag.mp3']
		}),
		color: '#8e44ad'
	},
	m: {
		sound: new Howl({
  		src: ['sounds/A/moon.mp3']
		}),
		color: '#2c3e50'
	}
 }
var myCircles = [];
var pumpFllag = false;
var componentIndex = 0;
function onKeyDown(event) {
	if (keyData[event.key]){
		for (var i = 0; i < balls.length && pumpFllag; i++) {
			myCircles.push( new Path.Circle(balls[i].point,balls[i].radius));
			myCircles[myCircles.length-1].fillColor = keyData[event.key].color;
		}

		keyData[event.key].sound.play();
		componentIndex++
		componentIndex = componentIndex % 6

	}
}

function Ball(r, p, v) {
	this.radius = r;
	this.point = p;
	this.vector = v;
	this.maxVec = 15;
	this.numSegment = Math.floor(r / 3 + 2);
	this.boundOffset = [];
	this.boundOffsetBuff = [];
	this.sidePoints = [];
	this.path = new Path({
		fillColor: {
			hue: Math.random() * 360,
			saturation: 1,
			brightness: 1
		},
		blendMode: 'lighter'
	});

	for (var i = 0; i < this.numSegment; i ++) {
		this.boundOffset.push(this.radius);
		this.boundOffsetBuff.push(this.radius);
		this.path.add(new Point());
		this.sidePoints.push(new Point({
			angle: 360 / this.numSegment * i,
			length: 1
		}));
	}
}

Ball.prototype = {
	iterate: function(b) {
		this.checkBorders();
		if (this.vector.length > this.maxVec)
			this.vector.length = this.maxVec;
		this.point += this.vector;
		this.updateShape();
	},

	checkBorders: function() {
		var size = view.size;
		if (this.point.x < -this.radius)
			this.point.x = size.width + this.radius;
		if (this.point.x > size.width + this.radius)
			this.point.x = -this.radius;
		if (this.point.y < -this.radius)
			this.point.y = size.height + this.radius;
		if (this.point.y > size.height + this.radius)
			this.point.y = -this.radius;
	},

	updateShape: function() {
		var segments = this.path.segments;
		for (var i = 0; i < this.numSegment; i ++)
			segments[i].point = this.getSidePoint(i);

		this.path.smooth();
		for (var i = 0; i < this.numSegment; i ++) {
			if (this.boundOffset[i] < this.radius / 4)
				this.boundOffset[i] = this.radius / 4;
			var next = (i + 1) % this.numSegment;
			var prev = (i > 0) ? i - 1 : this.numSegment - 1;
			var offset = this.boundOffset[i];
			offset += (this.radius - offset) / 15;
			offset += ((this.boundOffset[next] + this.boundOffset[prev]) / 2 - offset) / 3;
			this.boundOffsetBuff[i] = this.boundOffset[i] = offset;
		}
	},

	react: function(b) {
		var dist = this.point.getDistance(b.point);
		if (dist < this.radius + b.radius && dist != 0) {
			var overlap = this.radius + b.radius - dist;
			var direc = (this.point - b.point).normalize(overlap * 0.015);
			this.vector += direc;
			b.vector -= direc;
			console.log(dist);
			pumpFllag = true;
		} else pumpFllag = false;
	},


	getSidePoint: function(index) {
		return this.point + this.sidePoints[index] * this.boundOffset[index];
	}

};




//--------------------- main ---------------------

var balls = [];
var numBalls = 2;
for (var i = 0; i < numBalls; i++) {
	var position = Point.random() * view.size;
	var vector = new Point({
		angle: 360 * Math.random(),
		length: Math.random() * 10
	});
	var radius = Math.random() * 60 + 60;
	balls.push(new Ball(radius, position, vector));
}
var k = 0;
var timer = 0;
function onFrame() {
	
	for (var i = 0; timer<30 && i < myCircles.length; i++) {
		myCircles[i].scale((k++<25)?1.005:.9);
		myCircles[i].fillColor.hue += 1;
		if (myCircles[i].area < 1) {
			myCircles[i].remove();
			myCircles.splice(i,1);
			k=0;
		};
	};
		
	for (var i = 0; i < balls.length - 1; i++) {
		for (var j = i + 1; j < balls.length; j++) {
			balls[i].react(balls[j]);
		}
	}
	for (var i = 0, l = balls.length; i < l; i++) {
		balls[i].iterate((i)?0:1);
		
	}
	
}

