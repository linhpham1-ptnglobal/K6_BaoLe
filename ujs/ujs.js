import http from "k6/http";
import { check, group, sleep } from "k6";
import { Counter, Rate, Trend } from "k6/metrics";
import { randomIntBetween, randomItem } from "https://jslib.k6.io/k6-utils/1.0.0/index.js";



export function UJ2() {

    group("Login", function () {
        console.log('doing UJ2')

        sleep(2);
    });

}
