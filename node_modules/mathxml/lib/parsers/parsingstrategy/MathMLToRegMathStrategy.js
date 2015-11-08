module.exports = (function () {
	var tags = {
		math: "math",
		fenced: "mfenced",
		frac: "mfrac",
		identifier: "mi",
		mathText: "mtext",
		multiscripts: "mmultiscripts",
		number: "mn",
		operator: "mo",
		overscript: "mover",
		root: "mroot",
		row: "mrow",
		squareRoot: "msqrt",
		subscript: "msub",
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
		var value = "";
		// Work on and root.
		
		switch (name) {
			case tags.fenced: value = fenced(attr, tType, tagTypes); break;
			case tags.frac: value = signDisplay(tType, "(", ")", tagTypes); break;
			case tags.identifier: break;
			case tags.math: break;
			case tags.mathText: break;
			case tags.multiscripts: value = tags.multiscripts + ","; break;
			case tags.number: break;
			case tags.operator: break;
			case tags.overscript: value = tags.overscript + ","; break;
			//case tags.root: value = signDisplay(tType,"{", "}", tagTypes); break;
			case tags.row: value = signDisplay(tType, "(", ")", tagTypes); break;
			case tags.squareRoot: value = signDisplay(tType,"#{", "}", tagTypes); break;
			case tags.subscript: value = signDisplay(tType, "", "}", tagTypes); break;
			case tags.superscript: value = signDisplay(tType, "", "}", tagTypes); break;
			case tags.underOverscript: value = tags.underOverscript + ","; break;
			case tags.underscript: value = tags.underscript + ","; break;
		}

		return value;
	}
	
	function placeRoot(notation) {
		return null;
	}

	function placeFrac(frac) {
		if (frac.NODE_COUNT === 0) {
			frac.NODE_COUNT++;
		} else {
			return "/";
		}

		return "";
	}

	function placeScript(notation, sign) {
		if (notation.placed) {
			return "";
		}

		if (notation.NODE_COUNT === 0) {
			notation.NODE_COUNT++;
		} else {
			notation.placed = !notation.placed;
			return sign;
		}

		return "";
	}

	function placeOperator(parent) {
		if (parent.otherAttr === null) {
			return "";
		}

		var symbols = "";

		switch (parent.name) {
			case tags.frac: symbols = placeFrac(parent.otherAttr); break;
			case tags.superscript: symbols = placeScript(parent.otherAttr, "^{"); break;
			case tags.subscript: symbols = placeScript(parent.otherAttr, "_{"); break;
			//case tags.root: symbols = placeRoot(parent.name); break;
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

})();