var records = [
    { id: 1, username: '1', password: '1', displayName: 'Kağan İnan', emails: [ { value: 'jack@example.com' } ], type: 'admin' }
  , { id: 2, username: '2', password: '2', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ], type: 'ogretmen' }
];

exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}
