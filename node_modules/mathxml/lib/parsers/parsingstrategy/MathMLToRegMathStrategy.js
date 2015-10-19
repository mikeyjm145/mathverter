module.exports = (function() {
	var tags = {
		math: "math",
		fenced: "mfenced",
		frac: "mfrac",
		identifier: "mi",
		multiscripts: "mmultiscripts",
		number: "mn",
		operator: "mo",
		overscript: "mover",
		root: "mroot",
		row: "mrow",
		squareRoot: "msqrt",
		subsrcipt: "msub",
		superscript: "msup",
		underscript: "munder",
		underOverscript: "munderover"
	};
	
	function fenced(attr, tType, tagTypes) {
		if (attr === null) {
			return "";
		}
		
		var openSign = attr.open.value;
		var closeSign = attr.close.value;
		//var separators = attr[2].value;
		
		if (tType === tagTypes.OPEN && openSign === "" && closeSign === "") {
			return "{";
		} else if (tType === tagTypes.CLOSED && openSign === "" && closeSign === "") {
			return "}";
		}
		
		if (tType === tagTypes.OPEN) {
			return openSign;
		} else if (tType === tagTypes.CLOSED) {
			return closeSign;
		}
		
		return "";
	}
	
	function signDisplay(tType, open, close, tagTypes) {
		if (tType === tagTypes.OPEN) {
			return open;
		} else if (tType === tagTypes.CLOSED) {
			return close;
		}
		return "";
	}
	
	function getTag(name, attr, parent, tType, tagTypes) {
		var tagName = "";
		switch(name) {
				case tags.fenced: tagName = fenced(attr, tType, tagTypes); break;
				case tags.frac: tagName = signDisplay(tType, "(", ")", tagTypes); break;
				case tags.identifier: break;
				case tags.math: break;
				case tags.multiscripts: tagName = tags.multiscripts + ","; break;
				case tags.number: break;
				case tags.operator: break;
				case tags.overscript: tagName = tags.overscript + ","; break;
				case tags.root: tagName = tags.root + ","; break;
				case tags.row: tagName = signDisplay(tType, "(", ")", tagTypes); break;
				case tags.squareRoot: tagName = tags.squareRoot + ","; break;
				//case tags.subsrcipt: tagName = signDisplay(tType, "^(", ")", tagTypes); break;
				case tags.superscript: tagName = signDisplay(tType, "", "}", tagTypes); break;
				case tags.underOverscript: tagName = tags.underOverscript + ","; break;
				case tags.underscript: tagName = tags.underscript + ","; break;
			}
			
		return tagName;
	}
	
	function placeFrac(fracCount) {
		if (fracCount.NODE_COUNT === 0) {
			fracCount.NODE_COUNT++;
		} else {
			return "/";
		}
		
		return "";
	}
	
	function placeSuperscript(supCount) {
		if (supCount.placed) {
			return "";
		}
		
		if (supCount.NODE_COUNT === 0) {
			supCount.NODE_COUNT++;
		} else {
			supCount.placed = !supCount.placed;
			return "^{";
		}
		
		return "";
	}
	
	function placeOperator(parent) {
		if (parent.otherAttr === null) {
			return "";
		}
		
		var symbols = "";
		
		switch(parent.name) {
			case tags.frac: symbols = placeFrac(parent.otherAttr); break;
			case tags.superscript: symbols = placeSuperscript(parent.otherAttr); break;
		}
		
		return symbols;
	}
	
	return {
		getTag: getTag,
		signDisplay: signDisplay,
		fenced: fenced,
		placeFrac: placeFrac,
		placeOperator: placeOperator,
		tags: tags
	}
	
}) ();