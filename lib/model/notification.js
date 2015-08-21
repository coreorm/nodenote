/**
 * notification object
 */
var notification = {
    'name':'',
    'object':null,
    'userInfo':{},
    'getUserInfo': function(key)
    {
        if (typeof key == 'undefined') {
            return userInfo;
        }

        if (userInfo[key]) {
            return userInfo[key];
        }
    },
    'create': function(aName, anObject, aUserInfo)
    {
        var note = Object.create(notification);
        if (aName) {
            note.name = aName;
        }
        if (anObject) {
            note.object = anObject;
        }
        if (aUserInfo) {
            note.userInfo = aUserInfo;
        }

        return note;
    }
};

module.exports = notification;
