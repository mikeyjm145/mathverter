AirPadApp.factory('OrigSummernoteConfig', [function () {
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

AirPadApp.factory('CustSummernoteConfig', [function () {
	return {
        styleWithSpan: true,
        focus: true,
        airMode: false,
        toolbar: [
            ['view', ['codeview']]
        ]
    };
}]);