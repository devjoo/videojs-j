window.HELP_IMPROVE_VIDEOJS = false;
/*

This example shows how to include videojs-contrib-ads as a module import
in an ad plugin. It uses webpack to achieve this.

To build this example:

* follow instructions in the documentation to build videojs-contrib-ads
  * http://videojs.github.io/videojs-contrib-ads/developer/getting-started.html
* cd to this directory
* npm install webpack -g
* npm install webpack-command -g
* webpack ./entry.js --output=bundle.js

*/

import videojs from 'video.js';
import vast from './vast.js';

// This import works because we're inside the contrib-ads project.
// You will want to import 'videojs-contrib-ads' in your code after
// installing via NPM.
import '../..';

/*
이지우 수정
https://github.com/googleads/videojs-ima/pull/382/files
videojs.plugin('examplePlugin', function() {
  this.ads();

  // Ad plugin logic goes here
});
*/

// Cross-compatibility for Video.js 5 and 6.
var registerPlugin = videojs.registerPlugin || videojs.plugin;
registerPlugin('examplePlugin', function (opts) {
  this.ads();

  // Ad plugin logic goes here
  console.log('여기에 광고 로직을 추가해주세요');

  var player = this;
  var container = document.getElementById('player');
  var adsCancelTimeout = 3000;
  var options = {};

  // var vastAd = player.vastClient({
  //   //Media tag URL
  //   adTagUrl: "http://videoads.theonion.com/vast/270.xml",
  //   playAdAlways: true,
  //   //Note: As requested we set the preroll timeout at the same place than the adsCancelTimeout
  //   adCancelTimeout: adsCancelTimeout,
  //   adsEnabled: !!options.adsEnabled
  // });

  vast.init(container, player, './vast.sample.3.0/Event_Tracking-test.xml');
});

// registerPlugin('vastClient', videoJsVAST);

var player = videojs('#player', {
  controls: true,
  class:'video-js vjs-default-skin',
  techOrder: ["html5"],
  sources: [{
    src: 'https://bitmovin-a.akamaihd.net/content/playhouse-vr/m3u8s/105560.m3u8',
    type: 'application/x-mpegURL'
  }]
});

player.examplePlugin();

console.log('player.ads', player.ads);
