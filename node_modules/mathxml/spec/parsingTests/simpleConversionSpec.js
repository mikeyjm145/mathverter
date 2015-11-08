describe("Core Parsing Functions For Regular Math to MathML",
function() {
	var regMathToMathMLParser = require('./../../lib/parsers/Regular Math/RegMathToMathML.js');
	
	function parse(input) {
		return regMathToMathMLParser.parse(input);
	}
	
	it("should return <mn>5</mn> as output", function() {
		var valueToParse = "5";
		var actual = parse(valueToParse);
		var expected = "<mn>5</mn>\n"
		
		expect(actual).toEqual(expected);
	});
	
	it("should return <mi>x</mi> as output", function() {
		var valueToParse = "x";
		var actual = parse(valueToParse);
		var expected = "<mi>x</mi>\n"
		
		expect(actual).toEqual(expected);
	});
	
	it("should return mfenced/mn/mo/mn as output", function() {
		var valueToParse = "(5+4)";
		var actual = parse(valueToParse);
		var expected = "<mfenced open='(' close=')' separators=''>\n<mn>5</mn>\n<mo>+</mo>\n<mn>4</mn>\n</mfenced>\n"
		
		expect(actual).toEqual(expected);
	});
	
	it("should return msqrt/mn as output", function() {
		var valueToParse = "#{5}";
		var actual = parse(valueToParse);
		var expected = "<msqrt>\n<mn>5</mn>\n</msqrt>\n"
		
		expect(actual).toEqual(expected);
	});
});