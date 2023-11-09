// import { parseHTML } from 'k6/html';
// import http from 'k6/http';

// export default function () {
//   const res = http.get('https://k6.io');
//   const doc = parseHTML(res.body); // equivalent to res.html()
//   const pageTitle = doc.find('head title').text();
//   const langAttr = doc.find('html').attr('lang');
//   console.log('doc', doc)
// }


// import http from 'k6/http';
// import { sleep } from 'k6';

// export default function () {
//   let res = http.get('https://test.k6.io');
//   console.log(res.body)
//   sleep(1);
// }

import { parseHTML } from 'k6/html';
import http from 'k6/http';

export default function () {
  const res = http.get('https://k6.io/contact/');
  const doc = parseHTML(res.body); // equivalent to res.html()
  const pageTitle = doc.find('head title').text();
  const langAttr = doc.find('html').attr('lang');
  // const body1 = doc.find('footer').text(); // works!!!
  const body1 = doc.find('footer').html(); // works!!!
  console.log('pageTitle', pageTitle)
  console.log('langAttr', langAttr)
  console.log('body1', body1)
  
}
