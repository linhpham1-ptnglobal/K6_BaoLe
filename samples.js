/*** Use this file to record useful/interesting/educating snippets of code you may want to refer to in the future */


/**** Finding elements in the response html 
 * https://k6.io/docs/javascript-api/k6-html/
*/
import { parseHTML } from 'k6/html';
import http from 'k6/http';

export default function () {
  const res = http.get('https://k6.io/contact/');
  const doc = parseHTML(res.body); // equivalent to res.html()
  const pageTitle = doc.find('head title').text();
  const langAttr = doc.find('html').attr('lang');
  const footerText = doc.find('footer').text(); // works!!!
  const footerHtml = doc.find('footer').html(); // works!!!
  console.log('pageTitle', pageTitle)
  console.log('langAttr', langAttr)
  console.log('footerText', footerText)
}

/**
 * Use K6 Utils: https://jslib.k6.io/k6-utils/1.0.0/index.js whenever you can
 * i.e. import { randomIntBetween, randomItem, findBetween } from "https://jslib.k6.io/k6-utils/1.0.0/index.js";
 */