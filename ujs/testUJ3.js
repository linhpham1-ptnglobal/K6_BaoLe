import { sleep, group } from 'k6'
import { randomIntBetween, randomItem } from "https://jslib.k6.io/k6-utils/1.0.0/index.js";

export function testUJ3(data) {
  let res = null;
  sleep(randomIntBetween(1, 5))
  console.log('doing testUJ3')
  data.testConfig.metrics.uj3Counter.add(1)
}