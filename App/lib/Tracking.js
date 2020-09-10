import Bugsnag from 'lib/Bugsnag';

export function formatBreadcrumbParams(params) {
  if ('string' === typeof params) return { message: params };
  if ('number' === typeof params) return { value: params };
  if ('boolean' === typeof params) return { value: params };
  if (Array.isArray(params)) return { value: JSON.stringify(params)};
  if ('function' === typeof params) return { value: 'function' };

  let formattedParams = params;

  // clean up params
  Object.keys(params || {}).forEach((key) => {
    const param = params[key];

    // remove functions from params
    if (typeof param === 'function') {
      formattedParams[key] = 'function';

      // stringify objects and array params
    } else if (typeof param === 'object') {
      formattedParams[key] = JSON.stringify(formattedParams[key]);

      // stringify numbers, null, undefined
    } else {
      formattedParams[key] += '';
    }
  });
  return formattedParams;
}

function leaveBreadcrumb(label, params = {}) {
  const formattedParams = formatBreadcrumbParams(params);
  Bugsnag.leaveBreadcrumb(label, formattedParams);
}

function notify(err) {
  Bugsnag.notify(err);
}

export {
  leaveBreadcrumb,
  notify,
};
