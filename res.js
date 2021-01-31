'use strict';

exports.ok = function(values, res) {
  let data = {
    'status': 200,
    'values': values
  };

   res.json(data);
   res.end();
}

// response nested majors
exports.nestedOk = function(values, res) {
  // do accumulation
  const theResult = values.reduce((accumulate, item) => {
    // specify a key group
    if (accumulate[item.name]) {
      // create student group variables
      const studentGroup = accumulate[item.name];

      // check if the array is majors
      if (Array.isArray(studentGroup.major)) {
        // add value to the group of majors
        studentGroup.major.push(item.major);
      } else {
        studentGroup.major = [studentGroup.major, item.major];
      }
    } else {
      accumulate[item.name] = item;
    }

    return accumulate;
  }, {});

  let data = {
    'status': 200,
    'values': theResult
  };

  res.json(data);
  res.end();
}