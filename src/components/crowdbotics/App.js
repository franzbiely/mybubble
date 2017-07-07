import React, { Component } from 'react';
// import $ from 'jquery';

class App extends Component {
    
    createBubble() {
        // The Bubble Class
        var DOMBubble;
        var flyInterval;
        var Bubble = function(size, lifetime, speed, id, top, left) {
            this.id = id;
            this.size = size;
            this.lifetime = lifetime; // milliseconds
            this.speed = speed;

            var that = this;

            function flyUp(dom) {
                return setInterval(function() {
                    dom.style.top = parseInt(dom.style.top) - 10 + "px";
                }, that.speed);
            }

            function born() {
                DOMBubble = document.createElement('span');
                DOMBubble.className = "fade-in bubble bubble_id-" + id + " bubble_lifetime-" + lifetime + " " + that;

                DOMBubble.style.width = size + "px";
                DOMBubble.style.height = size + "px";
                DOMBubble.style.top = top + "px";
                DOMBubble.style.left = left + "px";
                DOMBubble.setAttribute('onmouseover', 'killBubble(this)');

                document.body.appendChild(DOMBubble);

                flyInterval = flyUp(DOMBubble);
                deadline(that, DOMBubble, flyInterval);
            }
            function deadline(that, DOMBubble, flyInterval) {
                // indicator half life
                setTimeout(function() {
                    DOMBubble.className += ' old';
                    DOMBubble.className = DOMBubble.className.replace('fade-in', '');
                }, that.lifetime / 1.3);
                // for deadline
                setTimeout(function() {
                    if (DOMBubble.parentNode) {
                        DOMBubble.parentNode.removeChild(DOMBubble)
                    }
                    clearInterval(flyInterval);
                }, that.lifetime);
            }
            born();
        };
        // ---end---

        // Random function
        function rand(min, max) {
            return Math.random() * (max - min) + min;
        }

        

        // Instantiating bubble
        var bubble_id = 0;
        var speedBorn = 100;
        setInterval(function() {
            speedBorn = rand(10, 100);
            console.log(speedBorn);
        }, 5000);
        var bubbleBirth = setInterval(function() {
            var newBubble = new Bubble(
                rand(20, 50),
                20000,
                // rand(3000,7000),
                rand(50, 300),
                bubble_id,
                rand(10, 650),
                rand(10, 1350)
            ); // dapat random ning value sa parameters
            //clearInterval(bubbleBirth);
            bubble_id++;
        }, speedBorn);
    }
    render() {
        this.createBubble();
        return ( 
            <div className = "App">
                <h1>I love <br />Crowdbotics</h1>
                <p>Coded by : Francis Albores</p>
            </div>
        );
    }
}
App.contextTypes = {
    router: React.PropTypes.object
}
export default App;
