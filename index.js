var fs = require('fs');
var json2csv = require('json2csv');
var zip = new require('node-zip')();
var obj = JSON.parse(fs.readFileSync('new_orders', 'utf8'));
var orders = obj['unassignorders'];
var arr = [];
for (var date in orders) {
  for (var orderId in orders[date]) {
    let order = orders[date][orderId];
    arr.push({
      date: date,
      orderId: orderId,
      mobile: order['mobilenumber'],
      customer_name: order['name'],
      address: order['address'],
      amount: order['amount'],
      country: order['country'],
      delivery_date: order['delivery_date'],
      delivery_time: order['time'],
      products: order['productdesc']
    })
  }
}

var fields =['date', 'orderId', 'mobile', 'customer_name', 'address', 'amount', 'country', 'delivery_date',
  'delivery_time', 'products'];
var csv = json2csv({ data: arr, fields: fields});
zip.file('reports.csv', csv);
var data = zip.generate({base64:false,compression:'DEFLATE'});
var fileName = 'reports.zip';
fs.writeFileSync(fileName, data, 'binary');
