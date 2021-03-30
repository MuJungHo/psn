const debounce = (func, delay) => {
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
  
  export default debounce
  