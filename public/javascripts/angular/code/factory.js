MathverterApp.factory('OrigSummernoteConfig', [function () {
	return {
        styleWithSpan: true,
        focus: true,
        airMode: true,
        toolbar: [
            ['edit',['undo','redo']],
            ['headline', ['style']],
            ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
            ['fontface', ['fontname']],
            ['textsize', ['fontsize']],
            ['fontclr', ['color']],
            ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
            ['height', ['height']],
            ['table', ['table']],
            ['insert', ['link','hr']],
            ['view', ['fullscreen', 'codeview']],
            ['help', ['help']]
        ]
    };
}]);

MathverterApp.factory('CustSummernoteConfig', [function () {
	return {
        styleWithSpan: true,
        focus: true,
        airMode: false,
        toolbar: [
            ['view', ['codeview']]
        ]
    };
}]);

MathverterApp.factory('ImageCreatorFactory', function() {
   var image = {
        createImage: function(formula, data) {
            var doc = document.implementation.createHTMLDocument("");
            doc.write(data);
            doc.documentElement.setAttribute("xmlns", doc.documentElement.namespaceURI);
            var formattedData = (new XMLSerializer).serializeToString(doc);
            
            var content = formula.getContext('2d');
            var image = new Image();
            
            var start = "<svg xmlns='http://www.w3.org/2000/svg'>\n<foreignObject width='100%' height='100%'>\n"
            var end = "</foreignObject>\n</svg>";
            var DOMURL = self.URL || self.webkitURL || self;
            var svg = new Blob([start + formattedData + end], {type: 'image/svg+xml;charset=utf-8'});
            
            image.src = DOMURL.createObjectURL(svg);
            image.onload = function() {
                content.drawImage(image, 0, 0);
                DOMURL.revokeObjectURL(image.src);
            }
            
            return image;
        }
   }
   
   return image;
    
});