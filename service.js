const watson = require('watson-developer-cloud');

/*const assistant = new watson.AssistantV1({
  username: ,
  password: ,
  url:      
  version:  
});*/

exports.getMessage = body =>
  new Promise((resolve, reject) => {
    assistant.message(
      {
        workspace_id: '99b8a09d-6499-4f89-b53a-13e8d5e7ab07',
        input: { text: body.input }
      },
      function(err, response) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(response);
        }
      }
    );
  });