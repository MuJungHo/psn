export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export const debounce = (func, delay) => {
  var timeout
  return function () {
    var context = this, args = arguments
    var later = function () {
      func.apply(context, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, delay || 500)
  }
}

