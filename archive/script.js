import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  vus: 1,
  duration: '30s',
  insecureSkipTLSVerify: true
};
export default function () {
  http.get('https://hmcts.mcgirrtech.com/');
  sleep(1);
}