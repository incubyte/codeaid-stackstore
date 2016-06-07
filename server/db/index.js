'use strict';
var db = require('./_db');
module.exports = db;

require('./models/user')(db);
require('./models/dream')(db);
require('./models/cart')(db);
require('./models/reviews')(db);
require('./models/orders')(db);

