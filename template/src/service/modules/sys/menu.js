import request from '../../app.service';
import {
  sys
} from '../../api';

export function list(params) {
  return request.get(sys.menu.list, {
    params
  });
}
