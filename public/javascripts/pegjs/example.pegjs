/*
 * RegMath to MathML Grammar
 * ==========================
 *
 * Converts regular math to MathML.
 */

{
  function combine(first, rest, combiners) {
    var result = first;
    var i = 0;
    for (i = 0; i < rest.length; i++) {
      result = combiners[rest[i][1]](result, rest[i][3]);
    }

    return result;
  }

function toMathML(value) {
  var startOfResult = result = "<math mode='display' xmlns='http://www.w3.org/1998/Math/MathML'>\n<mrow>";

  var endOfResult = result = "</mrow>\n</math>";

  return startOfResult + value + endOfResult;
}

function toMathMLOperator(operator) {
  switch(operator){
case '*': return "<mo>x</mo>\n";break;
case '+': return "<mo>+</mo>\n";break;
case '-': return "<mo>-</mo>\n";break;
case '=': return "<mo>=</mo>\n";break;
default: return "";
}
}

function toMathMLNumber(number) {
  return "<mn>" + number + "</mn>\n";
}

function toMathMLIdentifier(identifier) {
  return "<mi>" + identifier + "</mi>\n";
}

function toMathMLRow(values) {
  return "<mrow>\n" + values + "</mrow>\n";
}

function toMathMLFraction(value) {
  return "<mfrac>\n" + value + "</mfrac>\n";
}

function toMathMLSquareRoot(value) {
  return "<msqrt>\n" + value + "</msqrt>\n";
}

function toMathMLNthRoot(value, rootValue) {
  return "<msqrt>\n" + value + "\n" + rootValue + "</msqrt>\n";
}

function toMathMLPostscript(postbase, postsuper) {
  return "<msup>\n" + postbase + postsuper + "</msup>\n";
}

function toMathMLPrescript(presub, presuper) {
  return "<mprescript/ >\n" + presub + "\n" + preSuper + "\n";
}

function toMathMLMultiScript(base, postsub, postsuper, presub, presuper) {
  return 
  "<mmultiscripts>\n" + base + "\n" + toMathMLPostscript(postsub, postsuper) + toMathMLPrescript(presub, presuper) + "</mmultiscripts>\n";
}

function toMathMLIntegral(start, end) {
/*
	Come up with math operator for integral sign
*/
  return "<msubsup>" + "<mo>&#x222B;</mo>\n" + start + "\n" + end + "\n" + "</msubsup>\n";
}

function toMathMLMover(value) {
  return "<mover accentover='true'>" + toMathMLRow(value) + "<mo>&#x23DE;</mo>\n" + "</mover>\n";
}

function toMathMLMunder(value) {
  return "<munder accentunder='true'>" + toMathMLRow(value) + "<mo>&#x23DE;</mo>\n" + "\n" + "</munder>\n";
}
}

Expression
  = first:(Parenthesis/SquareBrackets/AbsoluteValue/InvisibleParenthesis) rest:(_ ("+" / "-" / "*" / "/" / "^" / ";" / "=") _ OtherLetterAndSymbols)* {
      return combine(first, rest, {
        "+": function(left, right) { return left + toMathMLOperator("+") + right; },
        "-": function(left, right) { return left + toMathMLOperator("-") + right; },
        "*": function(left, right) { return left + toMathMLOperator("*") + right; },
        "/": function(left, right) { return toMathMLFraction(toMathMLRow(left) + toMathMLRow(right)); },
        "^": function(left, right) { return toMathMLPostscript(left, right); },
        ";": function(left, right) { return left + right; },
        "=": function(left, right) { return left + toMathMLOperator("=") + right; }
      });
    }

Parenthesis
  = "(" _ expr:Expression _ ")" _ { return "<mfenced open='(' close=')' separators=''>\n" + expr + "</mfenced>\n"; }
  / Integer / Identifier

SquareBrackets
  = "[" _ expr:Expression _ "]" { return "<mfenced open='[' close=']' separators=''>\n" + expr + "</mfenced>\n"; }
  / Integer / Identifier

AbsoluteValue
  = "|" _ expr:Expression _ "|" { return "<mfenced open='|' close='|' separators=''>\n" + expr + "</mfenced>\n"; }
  / Integer / Identifier

InvisibleParenthesis
  = "{" _ expr:Expression _ "}" { return "<mfenced open='' close='' separators=''>\n" + expr + "</mfenced>\n"; }
  / Integer / Identifier

OtherLetterAndSymbols
  = _ expr:Expression _ { return expr; }
  / Identifier / Integer  / EOL / Equal

Integer "integer"
  = [0-9]+ { return toMathMLNumber(parseInt(text(), 10)); }
  
Identifier "identifier"
  = [a-zA-Z]+ { return toMathMLIdentifier(text()); }

EOL "eol"
  = [;]* { return text(); }

Equal "equal"
  = [=]* { return text(); }

_ "whitespace"
  = [ \s\t\n\r]*