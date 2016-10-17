// dependencies
var AWS = require('aws-sdk'); //Provided by lambda (no need to install)
var fs   = require("fs");
var path = require("path");
var util = require('util');
var moment = require('moment');

// get reference to S3 client
var s3 = new AWS.S3();

exports.handler = function(event, context) {
  // Load config.json
  var configPath = path.resolve(__dirname, "config.json");
  var config = JSON.parse(fs.readFileSync(configPath, { encoding: "utf8" }));

  // Read options from the event.
  console.log("Reading options from event:\n", util.inspect(event, {depth: 5}));
  var dstBucket = config.dstBucket; //from config.json
  var folder = moment().format('YYYY-MM-DD HH.mm.ss');
  var dstKey = 'databaseDump.mongo';

  process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'];

  var exec = require('child_process').exec;
  var cmd = './bin/mongodump --archive';
  cmd = cms + ' --db ' + config.mongo.db;
  cmd = cms + ' --username ' + config.mongo.username;
  cmd = cms + ' --password ' + config.mongo.password;
  cmd = cms + ' --host ' + config.mongo.host;
  // console.log(cmd);

  exec(cmd, function(error, stdout, stderr) {
    if (error){
      console.log(error);
    } else {
      s3.putObject(
        {
          Bucket: dstBucket,
          Key: folder + '/' + dstKey,
          Body: stdout
        },
        function(err, data) {
          if (err){
            console.log(err);
          } else {
            console.log("Successfully uploaded data");
          }
        }
      );
    }
  });
};
