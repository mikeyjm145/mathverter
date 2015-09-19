AirPadApp.filter('FindUsersByCredentials', function () {
    return function (username, password, users) {
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            if (username === user.username && password === user.password) {
                return user;
            }
        }
        return null;
    }
});
/**
 * var found = $filter('getById')(username, password, users);
 * $scope.selected = JSON.stringify(found);
 */