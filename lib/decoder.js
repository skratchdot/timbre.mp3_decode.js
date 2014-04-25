/*!
 * timbre.mp3_decode.js
 * http://skratchdot.com/projects/timbre.mp3_decode.js/
 *
 * Copyright (c) 2014 skratchdot
 * Licensed under the MIT license.
 */
/*globals window, timbre, Blob, Worker */
(function () {
	var isBlobWorkerEnabled = function () {
		try {
			var script = 'var browser_site_crawl_test = 1;',
				worker = new Worker(window.URL.createObjectURL(new Blob([script], {
					type: "text/javascript"
				})));
			return !!worker.postMessage;
		} catch (e) {
			return false;
		}
	};
	if (typeof timbre !== 'undefined' && timbre.envtype === 'browser' && isBlobWorkerEnabled()) {
		timbre.modules.Decoder.mp3_decode = function (src, onLoadedMetaData,
			onLoadedData) {
			var mixdown, bufferL, bufferR;
			var worker = new Worker('./decode-worker');
			worker.addEventListener('error', function () {
				console.error('worker error', arguments);
			});
			worker.addEventListener('message', function (e) {
				if (e.data.type === 'onLoadedMetaData') {
					// initialize our buffers
					mixdown = new Float32Array(e.data.length);
					if (e.data.channels === 2) {
						bufferL = new Float32Array(e.data.length);
						bufferR = new Float32Array(e.data.length);
					}
					// our meta data has been loaded
					onLoadedMetaData({
						samplerate: e.data.samplerate,
						channels: e.data.channels,
						buffer: [mixdown, bufferL, bufferR],
						duration: e.data.duration
					});
				} else if (e.data.type === 'onLoadedData') {
					mixdown.set(e.data.mixdown);
					if (bufferL) {
						bufferL.set(e.data.bufferL);
					}
					if (bufferR) {
						bufferR.set(e.data.bufferR);
					}
					onLoadedData();
				}
			});
			if (typeof src === "string") {
				timbre.modules.Decoder.getBinaryWithPath(src, function (data) {
					worker.postMessage(data);
				});
			} else {
				worker.postMessage(src);
			}
		};
	}
}());
