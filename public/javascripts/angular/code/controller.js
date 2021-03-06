var notepad = function ($scope, $state, currUser) {
	$scope.SetName = function () {
		return currUser.username;
	};
	
	$scope.configureSettings = function() {
		var browserSupport = checkBrowserSupport();
		
		if (browserSupport === "supported") {
			return true;
		} else {
			return false;
		}
	}
	
	var setUserID = function () {
		return currUser.id;
	};
	
	$scope.LoggedIn = function () {
		return (currUser.id !== null);
	};
	
	$scope.GoToLogin = function () {
		$state.go('login');
    };
	
	$scope.GoToProfile = function () {
        $state.go('profile', {userID: currUser.id});
    };
};

var home = function ($scope, $window, $state, $stateParams, $http, $q, imageCreator, currUser, parserForRegMath, backupParserForRegMath) {
	$scope.currUser = currUser;
	//var testParser = parserForRegMath;
	//var backupTestParser = backupParserForRegMath;
	var opening = "<math mode='display' xmlns='http://www.w3.org/TR/MathML'>\n<mrow>\n\n";
	var closing = "</mrow>\n</math>";
	$scope.conversion = {
		conversionFrom: "",
		input: "",
		mathFormula: "",
		conversionTo: "",
		output: ""
	}
	
	$scope.language = [
		{id: 0, name: 'Java', imageID: 'logoForJava'},
		{id: 1, name: 'Python', imageID: 'logoForPython'},
		{id: 2, name: 'MathML', imageID: 'logoForMathML'},
		{id: 3, name: 'Regular Math', imageID: 'logoForRegMath'},
		{id: 4, name: 'C#', imageID: 'logoForCSharp'},
		{id: 5, name: 'C++', imageID: 'logoForCPlusPlus'},
		{id: 6, name: 'C', imageID: 'logoForC'},
		{id: 7, name: 'LaTex', imageID: 'logoForLaTex'},
		{id: 8, name: 'BrainFuck', imageID: 'logoForBrainFuck'}
	];
	
	var isLanguageSelected = [
		{id: 0, name: 'Java', imageID: 'logoForJava', borderStart: false, borderConvert: false},
		{id: 1, name: 'Python', imageID: 'logoForPython', borderStart: false, borderConvert: false},
		{id: 2, name: 'MathML', imageID: 'logoForMathML', borderStart: false, borderConvert: false},
		{id: 3, name: 'Regular Math', imageID: 'logoForRegMath', borderStart: false, borderConvert: false},
		{id: 4, name: 'C#', imageID: 'logoForCSharp', borderStart: false, borderConvert: false},
		{id: 5, name: 'C++', imageID: 'logoForCPlusPlus', borderStart: false, borderConvert: false},
		{id: 6, name: 'C', imageID: 'logoForC', borderStart: false, borderConvert: false},
		{id: 7, name: 'LaTex', imageID: 'logoForLaTex', borderStart: false, borderConvert: false},
		{id: 8, name: 'BrainFuck', imageID: 'logoForBrainFuck', borderStart: false, borderConvert: false}
	];
	
	$scope.statusStarting = {open: true};
	var lastIndexStart = -1;
	$scope.startingLanguage = "Select a Language";
	$scope.startingLanguageLogo = "";
	
	var startingLangaugeSelected = function() {
		if ($scope.startingLanguageLogo === "") {
			return false;
		}
		
		return true;
	}
	
	var setStartStatus = function() {
		$scope.statusStarting.open = !($scope.statusStarting.open);
	}
	
	var borderOrNoBorderStart = function(languageID) {
		if (languageID < 0 && languageID > 8) {
			return '';
		}
		
		if (isLanguageSelected[languageID].borderStarting) {
			return 'languageSelectBorder';
		}
		
		return '';
	}
	
	var setSelectedStartingLanguage = function(languageID) {
		if (languageID < 0 && languageID > 8) {
			isLanguageSelected[lastIndexStart].borderStart = false;
			$scope.startingLanguageLogo = "";
		}
		
		if (lastIndexStart >= 0 && lastIndexStart <= 8) {
			isLanguageSelected[lastIndexStart].borderStart = false;
		}
		
		$scope.startingLanguage = isLanguageSelected[languageID].name;
		isLanguageSelected[languageID].borderStart = true;
		$scope.startingLanguageLogo = isLanguageSelected[languageID].imageID;
		lastIndexStart = isLanguageSelected[languageID].id;
		$scope.conversion.conversionFrom = $scope.startingLanguage;
		$scope.statusStarting.open = false;
		
		if (languageID === 2) {
			$scope.conversion.input = opening + closing;
		} else {
			$scope.conversion.input = "";
		}
	};
	
	$scope.statusConversion = {open: true};
	var lastIndexConversion = -1;
	$scope.conversionLanguage = "Select a Language";
	$scope.conversionLanguageLogo = "";
	
	var setConversionStatus = function() {
		$scope.statusConversion.open = !($scope.statusConversion.open);
	}
	
	var conversionLangaugeSelected = function() {
		if ($scope.conversionLanguageLogo === "") {
			return false;
		}
		
		return true;
	}
	
	var borderOrNoBorderConversion = function(languageID) {
		if (languageID < 0 && languageID > 8) {
			return '';
		}
		
		if (isLanguageSelected[languageID].borderConvert) {
			return 'languageSelectBorder';
		}
		
		return '';
	}
	
	var setSelectedConversionLanguage = function(languageID) {
		if (languageID < 0 && languageID > 8) {
			isLanguageSelected[lastIndexConversion].borderConvert = false;
			$scope.conversionLanguageLogo = "";
		}
		
		if (lastIndexConversion >= 0 && lastIndexConversion <= 8) {
			isLanguageSelected[lastIndexConversion].borderConvert = false;
		}
		
		$scope.conversionLanguage = isLanguageSelected[languageID].name;
		isLanguageSelected[languageID].borderConvert = true;
		$scope.conversionLanguageLogo = isLanguageSelected[languageID].imageID;
		lastIndexConversion = isLanguageSelected[languageID].id;
		$scope.conversion.conversionTo = $scope.conversionLanguage;
		$scope.statusConversion.open = false;
	};
	
	var clearLanguageStart = function() {
		if (lastIndexStart >= 0 &&  lastIndexStart <= 8) {
			isLanguageSelected[lastIndexStart].borderStart = false;
			lastIndexStart = -1;
		}
		
		$scope.startingLanguageLogo = "";
		$scope.startingLanguage = "Select a Language";
		$scope.conversion.conversionFrom = "";
		$scope.statusStarting.open = true;
	}
	
	var clearLanguageConversion = function() {
		
		if (lastIndexConversion >= 0 &&  lastIndexConversion <= 8) {
			isLanguageSelected[lastIndexConversion].borderConvert = false;
			lastIndexConversion= -1;
		}
		
		$scope.conversionLanguageLogo = "";
		$scope.conversionLanguage = "Select a Language";
		$scope.conversion.conversionTo = "";
		$scope.statusConversion.open = true;
	}
	
	$scope.clearLanguage = function(symbol) {
		if (symbol === 's') {
			clearLanguageStart();
			$scope.conversion.input = "";
		} else if (symbol === 'c') {
			clearLanguageConversion();
			$scope.conversion.output = "";
			injectHTML('formulaDisplay', "");
		} else if (symbol === 'a') {
			clearLanguageStart();
			clearLanguageConversion();
			$scope.conversion.input = "";
			$scope.conversion.mathFormula = "";
			$scope.conversion.output = "";
			injectHTML('formulaDisplay', "");
		}
	}
	
	$scope.clearAll = function() {
		if (lastIndexStart >= 0 &&  lastIndexStart <= 8) {
			isStartingLanguageSelected[lastIndexStart].borderStart = false;
			lastIndexStart = -1;
		}
		
		if (lastIndexConversion >= 0 &&  lastIndexConversion <= 8) {
			isLanguageSelected[lastIndexConversion].borderConvert = false;
			lastIndexConversion= -1;
		}
		
		$scope.startingLanguageLogo = "";
		$scope.conversionLanguageLogo = "";
		$scope.startingLanguage = "Select a Language";
		$scope.conversionLanguage = "Select a Language";
		$scope.conversion.conversionFrom = "";
		$scope.conversion.conversionTo = "";
		$scope.conversion.input = "";
		$scope.conversion.output = "";
		$scope.statusStarting.open = true;
		$scope.statusConversion.open = true;
		injectHTML('formulaDisplay', "");
	}
	
	$scope.langaugeSelected = function(symbol) {
		if (symbol === 's') {
			return startingLangaugeSelected();
		} else if (symbol === 'c') {
			return conversionLangaugeSelected();
		}
	}
	
	$scope.setStatus = function(symbol) {
		if (symbol === 's') {
			setStartStatus();
		} else if (symbol === 'c') {
			setConversionStatus();
		}
	}
	
	$scope.getStatus = function(symbol) {
		if (symbol === 's') {
			return $scope.statusStarting.open;
		} else if (symbol === 'c') {
			return $scope.statusConversion.open;
		}
	}
	
	$scope.borderOrNoBorder = function(symbol, languageID) {
		if (symbol === 's') {
			return borderOrNoBorderStart(languageID);
		} else if (symbol === 'c') {
			return borderOrNoBorderConversion(languageID);
		}
	}
	
	$scope.setSelectedLanguage = function(symbol, languageID) {
		if (symbol === 's') {
			setSelectedStartingLanguage(languageID);
		} else if (symbol === 'c') {
			setSelectedConversionLanguage(languageID);
		}
	}
	
	function buildErrorMessage(e) {
		return e.location !== undefined
			? "Line " + e.location.start.line + ", column " + e.location.start.column + ": " + e.message
			: e.message;
	}
	
	function createImage(text) {
		var testcanvas = document.getElementById("test");
		var ctx = testcanvas.getContext('2d');
		ctx.clearRect(0,0,testcanvas.width,testcanvas.height);
		var data = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">'
			+ '<foreignObject width="100%" height="100%">'
			+ '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:30px; color: white; text-align: center;">'
			+ text
			+ '</div></foreignObject></svg>';
			
		var DOMURL = window.URL || window.webkitURL || window;
		var img = new Image();
		var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
		var url = DOMURL.createObjectURL(svg);

		img.onload = function () {
			ctx.drawImage(img, 0, 0);
			DOMURL.revokeObjectURL(url);
		}
		
		img.src = url;
	}
	
	function displayResult_MathML(converted) {
		var opening = "<math mode='display' xmlns='http://www.w3.org/TR/MathML'>\n<mrow>\n";
		var closing = "</mrow>\n</math>";
		
		var what = Object.prototype.toString;
		
		var commas = /,/g;
		$scope.conversion.output = opening + converted.result.replace(commas, "") + closing;
		injectHTML('formulaDisplay', $scope.conversion.output);
		
		var formulaDisplay = document.getElementById("formulaDisplay");
		createImage((formulaDisplay.innerHTML ||formulaDisplay.innerText));
	}
	
	function displayResult(converted) {
		$scope.conversion.output = converted.result;
		injectHTML('formulaDisplay', $scope.conversion.output);
		
		var formulaDisplay = document.getElementById("formulaDisplay");
		createImage((formulaDisplay.innerHTML || formulaDisplay.innerText));
	}
	
	function update(converted, convertType) {
		var what = Object.prototype.toString;
		if (convertType === "2,3") {
			if (converted.error) {
				throw converted.result;
			}
			
			displayResult(converted);
			
		} else if (convertType === "3,2") {
			typeCheck = what.call(converted.result);
		
			if (converted.error || typeCheck === "[object Array]") {
				throw converted.result;
			}
			
			displayResult_MathML(converted);
            
		} else if (convertType === "0,2") {
			typeCheck = what.call(converted.result);
		
			if (converted.error) {
				throw converted.result;
			} else if (typeCheck === "[object Array]") {
				throw  "Please enter valid Java code.";
			}
			
			displayResult_MathML(converted);
		} else if (convertType === "0,3") {
			typeCheck = what.call(converted.result);
		
			if (converted.error) {
				throw converted.result;
			} else if (typeCheck === "[object Array]") {
				throw  "Please enter valid Java code.";
			}
			
			displayResult(converted);
		} else if (convertType === "3,0") {
			typeCheck = what.call(converted.result);
		
			if (converted.error) {
				throw converted.result;
			} else if (typeCheck === "[object Array]") {
				throw  "Please enter valid Java code.";
			}
			
			displayResult(converted);
		}
	}
	
	var convertTo = function(conversion, input, supported, convertType) {
		$http.get('/convert/' + conversion, { params: { supported: supported, content: input } })
			.then(function(result) {
                console.log(result);
				if (result === undefined || result === null) {
					update({
						result: "Something went wrong. Please try again with another formula.",
						error: true
					}, convertType);
				} else if (result.data.expected !== undefined) {
					var errormessage = result.data;
					$scope.conversion.output =
						errormessage.name + ": "
						+ errormessage.message
						+ "\n\t Line "
						+ errormessage.location.start.line
						+ ", Column "
						+ errormessage.location.start.column;
					
					update({
						result: errormessage,
						error: true
					}, convertType);
				} else {					
					try {
						update({
							result: result.data,
							error: false
						}, convertType);
					} catch (err){
						$scope.conversion.output = err;
					}
				}
			}).catch(function(err) {
                $scope.conversion.output = "Something went wrong. Please try again with another formula.";
            });
	}
	
	function validate(xml) {
		var xt = "";
		var h3OK = 1;
		function checkErrorXML(x) {
			xt = "";
			h3OK = 1;
			checkXML(x);
		}

		function checkXML(n) {
			var l;
			var i;
			var nam;
			
			nam = n.nodeName
			if (nam == "h3") {
				if (h3OK==0) {
					return;
				}
				
				h3OK = 0;
			}
			
			if (nam == "#text") {
				xt = xt + n.nodeValue + "\n"
			}
			
			l = n.childNodes.length
			for (i = 0; i < l; i++) {
				checkXML(n.childNodes[i])
			}
		}

		function validateXML() {
			// code for IE
			if (window.ActiveXObject) {
				var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
				xmlDoc.async=false;
				xmlDoc.loadXML(xml);

				if(xmlDoc.parseError.errorCode!=0) {
					txt = "Error Code: " + xmlDoc.parseError.errorCode + "\n";
					txt = txt + "Error Reason: " + xmlDoc.parseError.reason;
					txt = txt + "Error Line: " + xmlDoc.parseError.line;
				} else {
					alert("No errors found");
				}
			}
			// code for Mozilla, Firefox, Opera, etc.
			else if (document.implementation && document.implementation.createDocument) {
				var parser=new DOMParser();
				var xmlDoc=parser.parseFromString(xml,"text/xml");
				if (xmlDoc.getElementsByTagName("parsererror").length>0) {
					checkErrorXML(xmlDoc.getElementsByTagName("parsererror")[0]);
					return xt;
				} else {
					return 'isValid';
				}
			} else {
				return 'Your browser cannot handle this script';
			}
		}
		
		return validateXML();
	}
	
	$scope.convert = function() {
        $scope.conversion.output = "";
		injectHTML('formulaDisplay', "");
		createImage("");
		
		if ($scope.conversion.input === '') {
			injectHTML('formulaDisplay', "Please insert proper input.");
			return;
		}
		
		if (lastIndexStart === -1 || lastIndexConversion === -1) {
			return;
		}
		
		if (lastIndexStart == lastIndexConversion) {
			$scope.conversion.output = $scope.conversion.input;
			injectHTML('formulaDisplay', "Same language selected.");
		} else if (lastIndexStart === 3 && lastIndexConversion === 2){
			try {
				convertTo('convertFromRegMathToMathML', $scope.conversion.input, checkBrowserSupport(), "3,2");
				
			} catch(err) {
				injectHTML('formulaDisplay', "");
				$scope.conversion.output = err;
			}
		} else if (lastIndexStart === 2 && lastIndexConversion === 3){
			var msg = validate($scope.conversion.input)
			if (msg !== 'isValid') {
				injectHTML('formulaDisplay', "");
				$scope.conversion.output = msg;
				return;
			}
			
			try {
				convertTo('convertFromMathMLToRegMath', $scope.conversion.input, checkBrowserSupport(), "2,3");
			} catch(err) {
				injectHTML('formulaDisplay', "");
				$scope.conversion.output = err;
			}
		} else if (lastIndexStart === 0 && lastIndexConversion === 2){
			try {
				convertTo('convertFromJavaToMathML', $scope.conversion.input, checkBrowserSupport(), "0,2");
			} catch(err) {
				injectHTML('formulaDisplay', "");
				$scope.conversion.output = err;
			}
        } else if (lastIndexStart === 0 && lastIndexConversion === 3){
			try {
				convertTo('convertFromJavaToMath', $scope.conversion.input, checkBrowserSupport(), "0,3");
			} catch(err) {
				injectHTML('formulaDisplay', "");
				$scope.conversion.output = err;
			}
        } else if (lastIndexStart === 3 && lastIndexConversion === 0){
			try {
				convertTo('convertFromMathToJava', $scope.conversion.input, checkBrowserSupport(), "3,0");
			} catch(err) {
				injectHTML('formulaDisplay', "");
				$scope.conversion.output = err;
			}
        }
	}
	
	$scope.arrowLeftDirection = function(open) {
		if (open) {
			return 'fa-arrow-down';
		}
		return 'fa-arrow-left';
	}
	
	$scope.arrowRightDirection = function(open) {
		if (open) {
			return 'fa-arrow-down';
		}
		return 'fa-arrow-right';
	}
	
	$scope.IsLoggedIn = function () {
		if (currUser.id === null) {
			$state.go("login");
		}
	};
	
	$scope.LoggedIn = function () {
		return (currUser.id !== null);
	};
	
	$scope.GoToAddNote = function () {
        $state.go("addnote");
    };
	
	$scope.GoToViewNotes = function () {
        $state.go("viewnotes");
    };
	
	$scope.GoToViewDeletedNotes = function () {
        $state.go("viewdeletednotes");
    };
	
	$scope.GoToViewFavoriteNotes = function () {
        $state.go("viewfavnotes");
    };
	
	$scope.GoToHome = function () {
        $state.go("home");
    };
	
    $scope.optionsTitle = {
        styleWithSpan: true,
        focus: true,
        airMode: true,
        toolbar: [
            ['edit', ['undo', 'redo']],
            ['headline', ['style']],
            ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
            ['fontface', ['fontname']],
            ['textsize', ['fontsize']],
            ['fontclr', ['color']],
            ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
            ['height', ['height']],
            ['table', ['table']],
            ['insert', ['link', 'hr']],
            ['view', ['fullscreen', 'codeview']],
            ['help', ['help']]
        ]
    };
	
	$scope.optionsTitleView = {
        styleWithSpan: true,
        focus: true,
        airMode: true,
        toolbar: [
            ['view', ['codeview']]
        ]
    };
};

var viewnotes = function ($scope, $state, $http, currUser, $anchorScroll, $location) {
	$scope.currUser = currUser.name;

	$scope.GetNotes = function() {
		$scope.list = [];
		$http.get('/notes/get_notes', { params: { userId: currUser.id } })
			.then(function(result) {
				if (result === undefined || result === null) {
					return;
				}

				if (result.data[0] !== undefined && result.data[0] !== null) {
					for (var i = 0; i < result.data[0].notes.length; i++) {
						$scope.list.push(result.data[0].notes[i]);
					}
				}
			});
		currUser.notes = $scope.list;
		return $scope.list;
	};

	$scope.listOfNotes = {
		notes: $scope.GetNotes()
	};

	$scope.sortOptions = [
		{id: 0, name: "Title Ascending"},
		{id: 1, name: "Title Descending"},
		{id: 2, name: "Date Created Ascending"},
		{id: 3, name: "Date Created Descending"},
		{id: 4, name: "Date Edited Ascending"},
		{id: 5, name: "Date Edited Descending"},
		{id: 6, name: "Favorited Ascending"},
		{id: 7, name: "Favorited Descending"}
	];

	$scope.selectedValue = null;
	$scope.predicate = "";
	$scope.reverse = false;

	var setSort = function (predicate, reversed) {
		$scope.predicate = predicate;
		$scope.reverse = reversed;
	};

	$scope.changedValue = function (value) {
		$scope.selectedValue = value;

		if ($scope.selectedValue === null) {
			setSort("", false);
			return;
		}

		switch ($scope.selectedValue.id) {
			case 0:
				setSort("title", false);
				break;
			case 1:
				setSort("title", true);
				break;
			case 2:
				setSort("creationDate", false);
				break;
			case 3:
				setSort("creationDate", true);
				break;
			case 4:
				setSort("recentEditDate", false);
				break;
			case 5:
				setSort("recentEditDate", true);
				break;
			case 6:
				setSort("favored", true);
				break;
			case 7:
				setSort("favored", false);
				break;
		}
	};

	$scope.IsLoggedIn = function () {
		if (currUser.id === null) {
			$state.go("login");
		}
	};

	$scope.scrollTo = function (id) {
		var newHash = id;
		if ($location.hash() !== newHash) {
			$location.hash(id);
		} else {
			$anchorScroll();
		}
	};

	$scope.GoToAddNote = function () {
		$state.go("addnote");
	};

	$scope.GoToEditNote = function (note) {
		if (note === null || note === undefined) {
			return;
		}

		$state.go("editnote", {noteID: note._id});
	};

	$scope.GoToNote = function (note) {
		if (note === null || note === undefined) {
			return;
		}

		$state.go("viewnote", {noteID: note._id});
	};

	$scope.AddNoteToFavorites = function (note) {
		note.favored = true;
		var note1 = {
			title: note.title,
			content: note.content,
			creator: note.creator,
			creationDate: note.creationDate,
			recentEditDate: theDate(0),
			favored: note.favored,
			user: {
				type: currUser.id,
				ref: 'users'
			},
			_id: note._id
		};
		$http.post('/notes/realEdit_note', note1).
			success(function(data, status, headers, config) {
				console.log('Great Success');
			}).error(function(data, status, headers, config) {
				console.log('Failure: ' + status);
			});

		$http.post('/notes/favorite_note', note1).
			success(function(data, status, headers, config) {
				console.log('Great Success');
			}).error(function(data, status, headers, config) {
				console.log('Failure: ' + status);
			});
	};

	$scope.ShareNote = function (note) {
		if (note === null || note === undefined) {
			return;
		}

		window.open('mailto:?subject=' + note.title + '&body=' + note.content);
	};

	$scope.DeleteNote = function (note) {
		var noteIndex = getNoteIndexByID(note.id, currUser.notes);
		var note1 = {
			title: note.title,
			content: note.content,
			creator: note.creator,
			creationDate: note.creationDate,
			recentEditDate: theDate(0),
			favored: false,
			user: {
				type: currUser.id,
				ref: 'users'
			},
			_id: note._id
		};
		$http.post('/notes/delete_note', note1).
			success(function(data, status, headers, config) {
				console.log('Great Success');
			}).error(function(data, status, headers, config) {
				console.log('Failure: ' + status);
			});
		currUser.notes.splice(noteIndex, 1);
	};
};

var viewnote = function ($scope, $state, $http, $stateParams, currUser) {
	if (currUser.notes === null) {
		return;
	}
	
	$scope.IsLoggedIn = function () {
		if (currUser.id === null) {
			$state.go("login");
		}
	};

	$scope.GetNote = function() {
		$scope.currNote = "";
		$http.get('/notes/get_note', {params: {userId: currUser.id, noteId: $stateParams.noteID}})
		.then(function(result) {
			$scope.currNote = getNoteByID($stateParams.noteID, result.data[0].notes);

			injectHTML('noteContent', $scope.currNote.content);
		});
	};
	
	$scope.ToViewNoteState = function () {
		var note = getNoteByID($stateParams.noteID, currUser.notes);
		
		$scope.GoToNote(note);
	};

    $scope.GoToNote = function (note) {
		if (note === null || note === undefined) {
			return;
		}
		$scope.currNote = getNoteByID(note.id, currUser.notes);
        $state.go("viewnote", {noteID: note.id});
    };
};

var viewfavoritenotes = function ($scope, $state, $http, $anchorScroll, $location, currUser) {
	$scope.listOfFavorites = {
		favs: currUser.favs
	};
	
	$scope.currUser = currUser.name;

	$scope.GetNotes = function() {
		$scope.list = [];
		$http.get('/notes/get_notes', { params: { userId: currUser.id } })
			.then(function(result) {
				if (result === undefined || result === null) {
					return;
				}

				for (var i = 0; i < result.data[0].favs.length; i++) {
					$scope.list.push(result.data[0].favs[i]);
				}
			});
		currUser.favs = $scope.list;
		return $scope.list;
	};

	$scope.listOfNotes = {
		notes: $scope.GetNotes()
	};
	
	$scope.IsLoggedIn = function () {
		if (currUser.id === null) {
			$state.go("login");
		}
	};
	
	$scope.scrollTo = function (id) {
        if ($location.hash() !== id) {
            $location.hash(id);
        } else {
            $anchorScroll();
        }
    };
	
	$scope.GoToViewNotes = function () {
        $state.go("viewnotes");
    };
	
	$scope.GoToNote = function (note) {
		if (note === null || note === undefined) {
			return;
		}
		
        $state.go("viewnote", {noteID: note._id});
    };
	
	$scope.RemoveNoteFromFavorites = function (note) {
		var noteIndex = getNoteIndexByID(note.id, currUser.favs);
		var note1 = {
			title: note.title,
			content: note.content,
			creator: note.creator,
			creationDate: note.creationDate,
			recentEditDate: theDate(0),
			favored: false,
			user: {
				type: currUser.id,
				ref: 'users'
			},
			_id: note._id
		};
		$http.post('/notes/realEdit_note', note1).
			success(function(data, status, headers, config) {
				console.log('Great Success');
			}).error(function(data, status, headers, config) {
				console.log('Failure: ' + status);
			});

		$http.post('/notes/deleteFavorite_note', note1).
			success(function(data, status, headers, config) {
				console.log('Great Success');
			}).error(function(data, status, headers, config) {
				console.log('Failure: ' + status);
			});
		currUser.favs.splice(noteIndex, 1);
	};
};

var addnote = function ($scope, $state, $http, currUser) {
	$scope.IsLoggedIn = function () {
		if (currUser.id === null) {
			$state.go("login");
		}
	};
	
	$scope.noError = true;
	
	$scope.form = {
		title: "",
		body: ""
	};
	
	$scope.GoToViewNotes = function () {
        $state.go("viewnotes");
    };
	
	$scope.ClearValues = function () {
        $scope.form = null;

        $scope.form = {
            title: "",
            body: ""
        };
		
		$scope.noError = true;
    };
	
	$scope.AddNote = function () {
		if ($scope.form.title.length > 0 && $scope.form.body.length > 0) {
			$scope.noError = true;

            var note = {
                title: $scope.form.title,
                content: $scope.form.body,
                creator: currUser.name,
                creationDate: theDate(0),
                recentEditDate: theDate(0),
                favored: false,
                user: {
                    type: currUser.id,
                    ref: 'users'
                }
            };

            $http.post('/notes/add_note', note).
                success(function(data, status, headers, config) {
					console.log('Great Success');
                }).error(function(data, status, headers, config) {
                    console.log('Failure: ' + status);
                });

            $scope.ClearValues();
			currUser.amountOfNotes = currUser.notes.length;
			$scope.GoToViewNotes();
		} else {
			$scope.noError = false;
		}
	};
};

var editnote = function ($scope, $state, $stateParams, $http, currUser) {
	$scope.IsLoggedIn = function () {
		if (currUser.username === null) {
			$state.go("login");
		}
	};
	
	$scope.noError = true;
	$scope.noInvalidIDError = true;
	
	$scope.editform = {
		id: "",
		title: "",
		body: ""
	};
	
	$scope.ToEditNoteState = function () {
		var noteID = $stateParams.noteID;
		var note = getNoteByID(noteID, currUser.notes);
		
		$scope.GoToEditNote(note);
	};
	
	$scope.TestNoteID = function () {
		var currNote = getNoteByID($stateParams.noteID, currUser.notes);
		var noteIndex = getNoteIndexByID($stateParams.noteID, currUser.notes);
		if (currNote !== null || currNote !== undefined) {
			$scope.editform = {
				id: currNote._id,
				title: currNote.title,
				body: currNote.content,
				index: noteIndex
			};
			
			$scope.noInvalidIDError = true;
		} else {
			$scope.noInvalidIDError = false;
		}
	};
	
	$scope.GoToViewNotes = function () {
        $state.go("viewnotes");
    };
	
	$scope.ClearEditValues = function () {
		var id = $scope.editform.id;
		$scope.editform = null;

		$scope.editform = {
			id: id,
			title: "",
			body: ""
		};

		$scope.noError = true;
    };
	
	$scope.UpdateNote = function () {
		if ($scope.editform.title.length > 0 && $scope.editform.body.length > 0) {
			$scope.noError = true;

			var note = getNoteByID($stateParams.noteID, currUser.notes);
			var note1 = {
				title: $scope.editform.title,
				content: $scope.editform.body,
				creator: note.creator,
				creationDate: note.creationDate,
				recentEditDate: theDate(0),
				favored: note.favored,
				user: {
					type: currUser.id,
					ref: 'users'
				},
				_id: $stateParams.noteID
			};
			$http.post('/notes/realEdit_note', note1).
				success(function(data, status, headers, config) {
					console.log('Great Success');
				}).error(function(data, status, headers, config) {
					console.log('Failure: ' + status);
					$scope.errorMessage = "Database Error: " + status;
					$scope.noError = false;
				});

			$scope.ClearEditValues();
			$scope.GoToViewNotes();
		}
	};
};

var viewdeletednotes = function ($scope, $state, $http, $anchorScroll, $location, currUser) {
	$scope.IsLoggedIn = function () {
		if (currUser.username === null) {
			$state.go("login");
		}
	};

	$scope.GetNotes = function() {
		$scope.list = [];
		$http.get('/notes/get_notes', { params: { userId: currUser.id } })
			.then(function(result) {
				if (result === undefined || result === null) {
					return;
				}

				for (var i = 0; i < result.data[0].deleted.length; i++) {
					$scope.list.push(result.data[0].deleted[i]);
				}
			});
		currUser.deleted = $scope.list;
		return $scope.list;
	};

	$scope.listOfNotes = {
		notes: $scope.GetNotes()
	};
	
	$scope.scrollTo = function (id) {
      var newHash = id;
      if ($location.hash() !== newHash) {
        $location.hash(id);
      } else {
        $anchorScroll();
      }
    };
	
	$scope.GoToViewNotes = function () {
        $state.go("viewnotes");
    };
	
	$scope.DeleteNoteForever = function (note) {
		var note1 = {
			title: note.title,
			content: note.content,
			creator: note.creator,
			creationDate: note.creationDate,
			recentEditDate: theDate(0),
			favored: false,
			user: {
				type: currUser.id,
				ref: 'users'
			},
			_id: note._id
		};
		$http.post('/notes/deleteForever_note', note1).
			success(function(data, status, headers, config) {
				console.log('Great Success');
			}).error(function(data, status, headers, config) {
				console.log('Failure: ' + status);
			});
		currUser.deleted.splice(noteIndex, 1);
	};
	
	$scope.RestoreNote = function (note) {
		var noteIndex = getNoteIndexByID(note.id, currUser.deleted);
		var note1 = {
			title: note.title,
			content: note.content,
			creator: note.creator,
			creationDate: note.creationDate,
			recentEditDate: theDate(0),
			favored: false,
			user: {
				type: currUser.id,
				ref: 'users'
			},
			_id: note._id
		};
		$http.post('/notes/restore_note', note1).
			success(function(data, status, headers, config) {
				console.log('Great Success');
			}).error(function(data, status, headers, config) {
				console.log('Failure: ' + status);
			});
		currUser.deleted.splice(noteIndex, 1);
		$scope.GoToViewNotes();
	};
};

var profile = function ($scope, $stateParams, $state, currUser, users) {
	$scope.noInvalidIDError = true;
	$scope.user = null;
	
	$scope.IsLoggedIn = function () {
		if (currUser.id === null) {
			$state.go("login");
		}
	};
	
	$scope.GoToViewNotes = function () {
        $state.go("viewnotes");
    };
	
	$scope.GoToViewDeletedNotes = function () {
        $state.go("viewdeletednotes");
    };
	
	$scope.GoToViewFavoriteNotes = function () {
        $state.go("viewfavnotes");
    };

    $scope.toViewState = function () {
        $state.go('profile.view');
    };

    $scope.toEditState = function () {
        $state.go('profile.edit');
    };
	
	$scope.TestUserID = function () {
		if (currUser.id === null || currUser.id !== $stateParams.userID) {
			$scope.noInvalidIDError = false;
			return;
		}
		
		currUser.amountOfNotes = currUser.notes.length;
		currUser.amountFavorited = currUser.favs.length;
		currUser.amountDeleted = currUser.deleted.length;
		
		$scope.user = currUser;
		$scope.noInvalidIDError = true;
	};
};

var login = function ($scope, $state, $http, currUser) {
	$scope.errorMessage = "";
	
	$scope.IsLoggedOut = function () {
        return (currUser.id === null);
    };
	
	var setLoginTitle = function () {
		if($scope.IsLoggedOut()) {
			return "Log In";
		}
		
		return "Log Out";
	};
	
	$scope.text = setLoginTitle();
	
    $scope.incomingUser = {
        username: "",
        password: ""
    };

    $scope.toLoginState = function () {
        $scope.errorMessage = "";
		$state.go('login');
    };

    $scope.toSignupState = function () {
        $scope.errorMessage = "";
		$state.go('signup');
    };

    $scope.Login = function () {
        if ($scope.incomingUser.username === ''
                || $scope.incomingUser.username === null
                || $scope.incomingUser.password === ''
                || $scope.incomingUser.password === null) {
            $scope.errorMessage = "Please fill in all required fields.";
            return;
        }

        if ($scope.incomingUser.username === currUser.username
                || $scope.incomingUser.password === currUser.password) {
            $scope.errorMessage = "Already logged in.";
            return;
        }

        $http.get('/users/login', {params:
        {username: $scope.incomingUser.username,
         password: $scope.incomingUser.password}}).
            success(function(data, status, headers, config) {
                $scope.user = data;

				if($scope.user._id === null || $scope.user._id === undefined) {
					$scope.errorMessage = "User does not exist. Please try again with different credentials.";
					return;
				}

				$scope.errorMessage = "";

                currUser.id = $scope.user._id;
                currUser.name = $scope.user.name;
                currUser.username = $scope.user.username;
                currUser.email = $scope.user.email;
                currUser.password = $scope.user.password;
                currUser.about = $scope.user.about;
                currUser.signupDate = $scope.user.signupDate;
                currUser.amountOfNotes = $scope.user.amountOfNotes;
                currUser.amountFavorited = $scope.user.amountFavorited;
                currUser.amountDeleted = $scope.user.amountDeleted;
                currUser.notes = $scope.user.notes;
                currUser.favs = $scope.user.favs;
                currUser.deleted = $scope.user.deleted;

				$state.go('home');
            }).
            error(function(data, status, headers, config) {
				$scope.errorMessage = "User does not exist. Please try again.";
            });
    };

    $scope.Logout = function () {
        if ($scope.IsLoggedOut()) {
            return;
        }
		
		currUser.id = null;
        currUser.name = null;
        currUser.username = null;
        currUser.email = null;
        currUser.password = null;
        currUser.about = null;
        currUser.signupDate = null;
        currUser.amountOfNotes = -1;
		currUser.amountFavorited = -1;
		currUser.amountDeleted = -1;
		currUser.notes = null;
		currUser.favs = null;
		currUser.deleted = null;
		
        $scope.toLoginState();
		
		$scope.text = setLoginTitle();
    };
};

var signup = function ($scope, $state, $http) {
	$scope.errorMessage = "";

	$scope.newUserInfo = {
		firstName: "",
		lastName: "",
		username: "",
		email: "",
		password: "",
		passwordAgain: ""
    };
	
    $scope.toLoginState = function () {
        $scope.errorMessage = "";
		$state.go('login');
    };

    $scope.toSignupState = function () {
        $scope.errorMessage = "";
		$state.go('signup');
    };

    $scope.SignUp = function () {
        var completed = true;
        $scope.errorMessage = "Please enter data into the required field ";

        if ($scope.newUserInfo.firstName === '' || $scope.newUserInfo.firstName === null) {
            $scope.errorMessage += "FIRST NAME, ";
            completed = false;
        }

        if ($scope.newUserInfo.lastName === '' || $scope.newUserInfo.lastName === null) {
            $scope.errorMessage += "LAST NAME, ";
            completed = false;
        }

        if ($scope.newUserInfo.username === '' || $scope.newUserInfo.username === null) {
            $scope.errorMessage += "USERNAME, ";
            completed = false;
        }

        if ($scope.newUserInfo.email === '' || $scope.newUserInfo.email === null) {
            $scope.errorMessage += "EMAIL, ";
        }

        if ($scope.newUserInfo.password === '' || $scope.newUserInfo.password === null) {
            $scope.errorMessage += "PASSWORD";
            completed = false;
        }

        if (!completed) {
            return;
        }

        if ($scope.newUserInfo.passwordAgain === ''
                || $scope.newUserInfo.passwordAgain === null
                || $scope.newUserInfo.passwordAgain !== $scope.newUserInfo.password) {
            $scope.errorMessage = "Please enter same value in both PASSWORD and PASSWORD_AGAIN fields.";
            return;
        }
		
		if ($scope.newUserInfo.password === $scope.newUserInfo.username
                || $scope.newUserInfo.password === $scope.newUserInfo.email
                || $scope.newUserInfo.password === $scope.newUserInfo.firstName
				|| $scope.newUserInfo.password === $scope.newUserInfo.lastName) {
            $scope.errorMessage = "Please enter a password that is not the same as your FIRST NAME, LAST NAME, USERNAME, or EMAIL.";
            return;
        }
		
		if ($scope.newUserInfo.password.length < 5) {
            $scope.errorMessage = "Please enter a password that is longer than 5 characters.";
            return;
        }

        $scope.errorMessage = "";

        var user = {
            name: $scope.newUserInfo.firstName + " " + $scope.newUserInfo.lastName,
            username: $scope.newUserInfo.username,
            email: $scope.newUserInfo.email,
            password: $scope.newUserInfo.password,
            about: 'New member',
            signupDate: theDate(0),
            amountOfNotes: 0,
            amountFavorited: 0,
            amountDeleted: 0,
            notes: [],
            favs: [],
            deleted: []
        };

		$http.post('/users/signUp', user)
			.success(function(data, status, headers, config) {
				if (data === "New user created successfully!") {
					$scope.newUserInfo = null;

					$scope.newUserInfo = {
						firstName: "",
						lastName: "",
						username:"",
						email: "",
						password: "",
						passwordAgain: ""
					};

					$scope.errorMessage = "";
					$scope.toLoginState();
				} else {
					$scope.errorMessage = data;
				}
			}).error(function(data, status, headers, config) {
				console.log('Failure' + status);
			});
    };
};

MathverterApp.controller('NotePad', [
	'$scope',
    '$state',
	'CurrUser',
    notepad
]);

MathverterApp.controller('Home', [
	'$scope',
	'$window',
    '$state',
    '$stateParams',
	'$http',
	'$q',
	'ImageCreatorFactory',
	'CurrUser',
	'ParserForRegMath',
	'BackupParserForRegMath',
    home
]);

MathverterApp.controller('ViewNotes', [
	'$scope',
    '$state',
	'$http',
	'CurrUser',
	'$anchorScroll',
	'$location',
    viewnotes
]);

MathverterApp.controller('ViewNote', [
	'$scope',
    '$state',
	'$http',
	'$stateParams',
	'CurrUser',
    viewnote
]);

MathverterApp.controller('ViewFavoriteNotes', [
	'$scope',
    '$state',
	'$http',
	'$anchorScroll',
	'$location',
	'CurrUser',
    viewfavoritenotes
]);

MathverterApp.controller('AddNote', [
	'$scope',
    '$state',
    '$http',
	'CurrUser',
    addnote
]);

MathverterApp.controller('EditNote', [
	'$scope',
    '$state',
	'$stateParams',
	'$http',
	'CurrUser',
    editnote
]);

MathverterApp.controller('ViewDeletedNotes', [
	'$scope',
    '$state',
	'$http',
	'$anchorScroll',
	'$location',
	'CurrUser',
    viewdeletednotes
]);

MathverterApp.controller('LoginController', [
    '$scope',
    '$state',
    '$http',
	'CurrUser',
    login
]);

MathverterApp.controller('SignupController', [
    '$scope',
    '$state',
    '$http',
    signup
]);

MathverterApp.controller('ProfileController', [
    '$scope',
    '$stateParams',
    '$state',
	'CurrUser',
    profile
]);