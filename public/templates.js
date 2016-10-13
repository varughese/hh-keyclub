angular.module('nhs').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/dashboard.html',
    "<h2>Events <a ui-sref=event.create class=\"btn btn-default\"><span class=\"glyphicon glyphicon-plus\"></span> Add</a></h2><table class=\"table clickable-table\"><thead><tr><th>Event</th><th><span class=\"glyphicon glyphicon-hourglass\"></span> <span class=hide-when-small>Hours</span></th><th><span class=\"glyphicon glyphicon-calendar\"></span> <span class=hide-when-small>Date</span></th></tr></thead><tbody><tr ng-repeat=\"event in events\" ui-sref=\"event.edit({eventID: '{{event._id}}' })\"><td>{{event.name}}</td><td>{{event.hours}}</td><td>{{event.date | date : 'EEE, MMM, d'}}</td></tr></tbody><tfoot><td><strong>Total Hours:</strong></td><td><strong></strong>{{findTotal()}}</td><td></td></tfoot></table><h2>Upcoming Events <a ng-if=user.admin ui-sref=uevent.create class=\"btn btn-default\"><span class=\"glyphicon glyphicon-plus\"></span> Add</a></h2><table class=\"table uevent-table\"><thead><tr><th>Event</th><th>Location</th></tr></thead><tbody><tr ng-repeat=\"event in upcoming | limitTo:25 | filter: { eventOver: false }\"><td><div><b>{{event.name}} <a class=edit ng-if=user.admin ui-sref=\"uevent.edit({ ueventID: '{{event._id}}' })\">Edit</a></b><div class=time-info><span><b>Location</b> {{event.location}}</span></div><div class=time-info><span><b>Time</b> {{event.timeStart}} – {{event.timeEnd}}</span></div><div class=description ng-bind-html=event.htmlDescription></div></div></td><td>{{event.date | date : 'EEEE, MMM, d'}}</td></tr></tbody></table>"
  );


  $templateCache.put('templates/event.html',
    "<h2 ng-if=\"getState() === 'event.create'\">Create Event</h2><h2 ng-if=\"getState() === 'event.edit'\">Edit Event <button type=button ng-if=\"getState() === 'event.edit'\" class=\"btn btn-default\" ng-click=deleteEvent()><span class=\"glyphicon glyphicon-trash\"></span> Delete</button></h2><form ng-submit=saveEvent()><div class=form-group><label>Name</label><input ng-model=eventData.name uib-typeahead=\"uevent.name for uevent in upcoming | limitTo:8 | filter: {'name': $viewValue }\" typeahead-on-select=setUEvent($item) class=form-control placeholder=Name></div><div uib-datepicker ng-model=eventData.date class=nhs-date-picker></div><div class=form-group><label>Date</label><span class=input-group>{{ eventData.date | date : 'longDate' }}</span></div><div class=form-group><label>Hours</label><input ng-model=eventData.hours type=number step=0.5 class=form-control placeholder=Hours></div><button type=submit ng-if=\"getState() === 'event.edit'\" class=\"btn btn-primary btn-block\">Update</button> <button type=submit ng-if=\"getState() === 'event.create'\" class=\"btn btn-primary btn-block\">Create</button></form>"
  );


  $templateCache.put('templates/header.html',
    "<div class=\"navbar navbar-inverse\" ng-show=user.loggedIn ng-cloak><div class=container><div class=navbar-header><button type=button class=\"navbar-toggle collapsed\" data-toggle=collapse data-target=#navbar-collapse-target aria-expanded=false><span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <a ui-sref=dashboard class=navbar-brand><span class=glyphicon><svg version=1.1 id=Layer_1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px width=25px height=25px viewBox=\"0 0 14 14\" enable-background=\"new 0 0 14 14\" xml:space=preserve><g><path fill-rule=evenodd clip-rule=evenodd fill=none d=\"M4.365,26.703c-3.937,0-7.872,0-11.804,0c0-4,0-8,0-11.996\r" +
    "\n" +
    "							c3.937,0,7.872,0,11.804,0C4.365,18.707,4.365,22.707,4.365,26.703z M3.059,7.558C2.898,7.376,2.727,7.25,2.645,7.08\r" +
    "\n" +
    "							C2.43,6.632,2.264,6.164,2.059,5.71C1.982,5.54,1.851,5.395,1.745,5.237c-0.115,0.17-0.299,0.327-0.332,0.512\r" +
    "\n" +
    "							c-0.24,1.317,0.006,2.562,0.676,3.71C3.016,11.053,4.497,12,6.137,12.676c1.07,0.441,2.193,0.281,3.183-0.338\r" +
    "\n" +
    "							c1.076-0.676,0.996-2.092-0.119-2.705C9.064,9.559,8.926,9.486,8.793,9.416C9.246,8.201,10.146,7.064,13,4.975\r" +
    "\n" +
    "							c-0.656-1.313-1.773-2.142-3.02-2.819C8.787,1.506,7.508,1.132,6.182,1C5.643,3.444,4.445,5.509,3.059,7.558z\"/><path fill-rule=evenodd clip-rule=evenodd d=\"M3.059,7.558C4.445,5.509,5.643,3.444,6.182,1\r" +
    "\n" +
    "							C7.508,1.132,8.787,1.506,9.98,2.155c1.246,0.678,2.363,1.506,3.02,2.819c-2.854,2.089-3.754,3.227-4.207,4.441\r" +
    "\n" +
    "							c0.133,0.07,0.271,0.143,0.408,0.217c1.115,0.613,1.195,2.029,0.119,2.705c-0.99,0.619-2.113,0.779-3.183,0.338\r" +
    "\n" +
    "							C4.497,12,3.016,11.053,2.088,9.459c-0.67-1.148-0.916-2.393-0.676-3.71c0.033-0.185,0.217-0.342,0.332-0.512\r" +
    "\n" +
    "							C1.851,5.395,1.982,5.54,2.059,5.71C2.264,6.164,2.43,6.632,2.645,7.08C2.727,7.25,2.898,7.376,3.059,7.558z M2.61,8.523\r" +
    "\n" +
    "							C2.592,9.055,2.823,9.391,3.059,9.707c0.871,1.168,2.096,1.824,3.425,2.32c0.116,0.043,0.25,0.057,0.376,0.059\r" +
    "\n" +
    "							c0.3,0.006,0.421-0.152,0.292-0.424c-0.111-0.236-0.257-0.465-0.425-0.666c-0.653-0.775-1.454-1.361-2.382-1.768\r" +
    "\n" +
    "							C3.795,8.988,3.235,8.777,2.61,8.523z M11.33,3.103C9.785,4.642,8.566,6.333,7.936,8.406c1.109-1.782,2.596-3.19,4.365-4.395\r" +
    "\n" +
    "							C11.961,3.692,11.654,3.407,11.33,3.103z\"/><path fill-rule=evenodd clip-rule=evenodd fill=none d=\"M2.61,8.523c0.625,0.254,1.186,0.465,1.735,0.705\r" +
    "\n" +
    "							c0.928,0.406,1.729,0.992,2.382,1.768c0.168,0.201,0.314,0.43,0.425,0.666c0.129,0.271,0.008,0.43-0.292,0.424\r" +
    "\n" +
    "							c-0.126-0.002-0.26-0.016-0.376-0.059c-1.329-0.496-2.554-1.152-3.425-2.32C2.823,9.391,2.592,9.055,2.61,8.523z\"/><path fill-rule=evenodd clip-rule=evenodd fill=none d=\"M11.33,3.103c0.324,0.305,0.631,0.59,0.971,0.909\r" +
    "\n" +
    "							c-1.77,1.204-3.256,2.613-4.365,4.395C8.566,6.333,9.785,4.642,11.33,3.103z\"/></g></svg></span><span class=title>Key Club</span></a></div><div class=\"collapse navbar-collapse\" id=navbar-collapse-target><ul class=\"nav navbar-nav\"><li><a ui-sref=dashboard><span class=\"glyphicon glyphicon-hourglass\"></span>Events</a></li><li ng-if=user.admin><a ui-sref=memberList>Check on Members</a></li><li ng-if=user.admin><a ui-sref=uevent.create>Add Upcoming Event</a></li></ul><ul class=\"nav navbar-nav navbar-right\"><li><a>Hello {{ user.firstname }}</a></li><li><a ng-click=logout()>Logout</a></li></ul></div></div></div>"
  );


  $templateCache.put('templates/login.html',
    "<div class=\"row col-md-6 col-md-offset-3 login\"><div class=col-sm-12><img class=img-responsive src=../images/nhs-logo.jpeg></div><div class=login-main><h1>Login</h1><form novalidate ng-submit=login()><div class=form-group><label>Username</label><input class=form-control required ng-model=user.username></div><div class=form-group><label>Password</label><input type=password class=form-control required ng-model=user.password></div><div class=\"alert alert-danger\" ng-if=error>{{ error }}</div><button type=submit class=\"btn btn-block btn-primary\"><span ng-if=!user.processing>Login</span> <span ng-if=user.processing class=spinner><span class=\"glyphicon glyphicon-repeat\"></span></span></button></form><button class=\"btn btn-block btn-link\" ui-sref=signup>Create Account</button></div></div>"
  );


  $templateCache.put('templates/members.html',
    "<h2>Member List</h2><table class=\"table clickable-table member-list\"><thead><tr class=filtertable><th>Name <span class=glyphicon ng-click=\"reverse = !reverse\" ng-show=\"propertyName === 'lastname'\" ng-class=\"{'glyphicon-triangle-top': reverse, 'glyphicon-triangle-bottom': !reverse}\"></span> <span class=\"glyphicon glyphicon-sort\" ng-click=\"propertyName = 'lastname'; reverse=false\" ng-show=\"propertyName !== 'lastname'\"></span></th><th>Hours <span class=glyphicon ng-click=\"reverse = !reverse\" ng-show=\"propertyName === 'totalHours'\" ng-class=\"{'glyphicon-triangle-top': reverse, 'glyphicon-triangle-bottom': !reverse}\"></span> <span class=\"glyphicon glyphicon-sort\" ng-click=\"propertyName = 'totalHours'; reverse=true\" ng-show=\"propertyName !== 'totalHours'\"></span></th><th><span class=hide-when-small>Checked</span> <span class=glyphicon ng-click=\"reverse = !reverse\" ng-show=\"propertyName === 'checked'\" ng-class=\"{'glyphicon-triangle-top': reverse, 'glyphicon-triangle-bottom': !reverse}\"></span> <span class=\"glyphicon glyphicon-sort\" ng-click=\"propertyName = 'checked'; reverse=false\" ng-show=\"propertyName !== 'checked'\"></span></th></tr></thead><tbody><tr ng-repeat=\"member in members | orderBy:propertyName:reverse\" ui-sref=\"singleMember({memberID: member._id})\"><td class=fullname>{{member.firstname + \" \" + member.lastname}}</td><td>{{member.totalHours}}</td><td><span ng-class=\"{'glyphicon-ok': member.checked }\" class=glyphicon></span></td></tr></tbody></table>"
  );


  $templateCache.put('templates/signup.html',
    "<div class=\"row col-md-6 col-md-offset-3 login signup\"><div class=col-sm-12><img class=img-responsive src=../images/nhs-logo.jpeg></div><div class=login-main><h1>Create Account</h1><form ng-submit=signup() name=signupForm><div class=form-group><label>First Name</label><input required class=form-control ng-model=user.firstname></div><div class=form-group><label>Last Name</label><input required class=form-control ng-model=user.lastname></div><div class=form-group><label>Username</label><input required class=form-control name=username ng-model=user.username placeholder=\"Use your school 'z' username\"></div><div class=invalid-message ng-show=signupForm.username.usernameTaken>Username taken</div><div class=form-group><label>Password</label><input type=password required class=form-control ng-model=user.password></div><div class=invalid-message ng-show=\"signupForm.confirmpassword.$invalid && !signupForm.confirmpassword.$pristine\">Passwords don't match</div><div class=form-group><label>Confirm Password</label><input type=password required class=form-control ng-model-options=\"{debounce: 300}\" compare-to=user.password name=confirmpassword ng-model=user.confirmpassword></div><button class=\"btn btn-block btn-primary\" type=submit ng-disabled=signupForm.$invalid>Signup</button></form></div></div>"
  );


  $templateCache.put('templates/single-member.html',
    "<div class=has-button-bar><h2>{{ member.firstname + \" \" + member.lastname }}</h2><h4>Events</h4><table class=table><thead><tr><th>Event</th><th>Hours</th><th>Date</th><th>Checked?</th></tr></thead><tbody><tr ng-repeat=\"event in events\"><td>{{event.name}}</td><td>{{event.hours}}</td><td>{{event.date | date : 'M/d'}}</td><td><input ng-if=!event.checked type=checkbox ng-model=event.justChecked> <span ng-if=event.checked class=\"glyphicon glyphicon-ok\"></span></td></tr></tbody><tfoot><td><strong>Total Hours:</strong></td><td><strong></strong>{{findTotal()}}</td><td></td><td></td></tfoot></table></div><div class=button-bar><button class=\"btn btn-default\" ui-sref=memberList><span class=\"glyphicon glyphicon-arrow-left\"></span> Back</button> <button class=\"btn btn-primary pull-right\" ng-click=saveChecks()>Save</button></div>"
  );


  $templateCache.put('templates/uevent.html',
    "<h2 ng-if=\"getState() === 'uevent.create'\">Create Event</h2><h2 ng-if=\"getState() === 'uevent.edit'\">Edit Event</h2><form ng-submit=saveEvent()><div class=form-group><label>Name</label><input ng-model=eventData.name class=form-control placeholder=Name></div><div uib-datepicker ng-model=eventData.date class=nhs-date-picker></div><div class=form-group><label>Date</label><span class=input-group>{{ eventData.date | date : 'longDate' }}</span></div><div class=form-group><label>Location</label><input ng-model=eventData.location class=form-control placeholder=Location></div><div class=form-group><label>Time Start</label><input ng-model=eventData.timeStart class=form-control placeholder=\"Start Time, like 1:00 PM\"></div><div class=form-group><label>Time End</label><input ng-model=eventData.timeEnd class=form-control placeholder=\"End Time, like 4:00 PM\"></div><div class=form-group><label>Description</label><textarea ng-model=eventData.description class=form-control placeholder=Description rows=10></textarea></div><button type=submit ng-show=\"getState() === 'uevent.create'\" class=\"btn btn-primary btn-block\">Create</button> <button type=submit ng-if=\"getState() === 'uevent.edit'\" class=\"btn btn-primary btn-block\">Update</button></form>"
  );

}]);
