import request from '../../app.service';
import {
  sys
} from '../../api';

// export function list(params) {
//   return request.get(sys.user.list, {
//     params
//   });
// }

export function info(id) {
  return request.get(sys.user.info + `/${id}`);
}

// export function add(data) {
//   return request.post(sys.user.add, {
//     ...data
//   });
// }

// export function update(data) {
//   return request.put(sys.user.update, {
//     ...data
//   });
// }
