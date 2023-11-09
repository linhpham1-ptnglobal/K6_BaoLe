
import { sleep, group } from 'k6'
import { randomIntBetween, randomItem } from "https://jslib.k6.io/k6-utils/1.0.0/index.js";
export function testUJ1(data) {
    let res = null;
    sleep(randomIntBetween(1, 5))
  console.log('doing testUJ1')
  data.testConfig.metrics.uj1Counter.add(1)
}