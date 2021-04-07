var APP_NAMESPACE = APP_NAMESPACE || (function(){
    var _args = {};

    return {
        init : function(Args) {
            _args = Args;
        },
        get : function(i) {
            return _args[i];
        }
    };
}());
