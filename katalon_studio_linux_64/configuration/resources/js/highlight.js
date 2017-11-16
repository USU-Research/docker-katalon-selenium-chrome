function addStyleSheet() {
	var sheet = document.createElement('style');
	sheet.innerHTML = ".katalonHighlight { outline : 2px solid rgba(255, 0, 0, 0.8); outline-offset: -2px;}\n"
			+ " .katalonDeHighlight { outline : 2px solid transparent; outline-offset: -2px;}";
	document.body.appendChild(sheet);
	return sheet;
}

function highlight(testObject) {
	var highlightInterval = 300;
	var highlightTimeout = 3000;
	var shouldClear = false;
	var oldClassName = testObject.className.replace("katalonHighlight", "").replace("katalonDeHighlight", "").trim();

	var sheet = addStyleSheet();

	var highlightFunc = setInterval(function() {
		testObject.className = oldClassName + " katalonHighlight";
	}, highlightInterval);

	var deHighlightFunc = setInterval(function() {
		testObject.className = oldClassName + " katalonDeHighlight";
		if (shouldClear) {
			clearInterval(highlightFunc);
			clearInterval(deHighlightFunc);

			testObject.className = oldClassName;

			document.body.removeChild(sheet);
		}
	}, highlightInterval * 2);

	function clearTimer() {
		shouldClear = true;
	}

	setTimeout(clearTimer, highlightTimeout);
}

highlight(arguments[0]);