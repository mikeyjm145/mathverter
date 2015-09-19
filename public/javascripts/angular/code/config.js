AirPadApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(false);
	$urlRouterProvider.when('/', '/home');
	$urlRouterProvider.when('', '/home');
    $urlRouterProvider.when('/note/:userID', '/note/:userID/redirect');/*/redirect*/
	$urlRouterProvider.when('/view_note/:noteID', '/view_note/:noteID/redirect');/*/redirect*/
	$urlRouterProvider.when('/edit_note/:noteID', '/edit_note/:noteID/redirect');/*/redirect*/


    $stateProvider

        // Home
        .state('home', {
            url: '/home',
            templateUrl: '/home.html',
			controller: 'Home'
        })

        // Add Note
        .state('addnote', {
            url: '/add_note',
            templateUrl: '/addnote.html',
			controller: 'AddNote'
        })
		
		// Edit Note
        .state('editnote', {
            url: '/edit_note/:noteID',
            templateUrl: '/editnote.html',
			controller: 'EditNote'
        })
		
		.state('editnote.redirect', {
            url: '/redirect',
            templateUrl: '/EditNoteTemplates/redirect.html'
        })

        // View Note
        .state('viewnote', {
            url: '/view_note/:noteID',
            templateUrl: '/viewnote.html',
			controller: 'ViewNote'
        })
		
		.state('viewnote.redirect', {
            url: '/redirect',
            templateUrl: '/ViewNoteTemplates/redirect.html'
        })

        // View Notes
        .state('viewnotes', {
            url: '/view_notes',
            templateUrl: '/viewnotes.html',
			controller: 'ViewNotes'
        })
		
		// View Favorite Notes
        .state('viewfavnotes', {
            url: '/view_fav_notes',
            templateUrl: '/viewfavorites.html',
			controller: 'ViewFavoriteNotes'
        })
		
		// View Deleted Notes
        .state('viewdeletednotes', {
            url: '/view_del_notes',
            templateUrl: '/viewdeletednotes.html',
			controller: 'ViewDeletedNotes'
        })

        // Login
        .state('login', {
            url: '^/login',
            templateUrl: '/loginView/userLogin.html',
			controller: 'LoginController'
        })

        // Sign Up
        .state('signup', {
            url: '^/signUp',
            templateUrl: '/loginView/userSignup.html',
			controller: 'SignupController'
        })

        // User Profile
        .state('profile', {
            url: '/profile/:userID',
            templateUrl: '/userProfile.html',
            controller: 'ProfileController'
        })

        .state('profile.redirect', {
            url: '/redirect',
            templateUrl: '/userProfileViews/redirect.html'
        })

        .state('profile.view', {
            url: '/view',
            templateUrl: '/userProfileViews/viewUserProfile.html'
        })

        .state('profile.edit', {
            url: '/edit',
            templateUrl: '/userProfileViews/editUserProfile.html'
        })

        .state('profile.noUser', {
            url: '/no-user',
            templateUrl: '/userProfileViews/userNotFound.html'
        });
});