;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-xinhao" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M1024 344l-89.6 94.4C824 332.8 675.2 268.8 512 268.8c-163.2 0-312 64-422.4 169.6L0 344C132.8 217.6 313.6 139.2 512 139.2 710.4 139.2 891.2 217.6 1024 344zM846.4 532.8l-89.6 94.4c-64-60.8-150.4-97.6-244.8-97.6-94.4 0-180.8 36.8-244.8 97.6l-89.6-94.4c86.4-83.2 204.8-132.8 334.4-132.8C641.6 398.4 758.4 449.6 846.4 532.8zM667.2 720 512 884.8 356.8 720c40-38.4 96-62.4 155.2-62.4C572.8 657.6 627.2 681.6 667.2 720z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-dianliang" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M877.728 313.472H62.688A62.688 62.688 0 0 0 0 376.16v271.68c0 34.624 28.064 62.688 62.688 62.688h815.04a62.688 62.688 0 0 0 62.688-62.688v-271.68a62.688 62.688 0 0 0-62.688-62.688z m41.792 334.368c0 23.072-18.72 41.792-41.792 41.792H62.688a41.792 41.792 0 0 1-41.792-41.792v-271.68c0-23.072 18.72-41.792 41.792-41.792h815.04c23.072 0 41.792 18.72 41.792 41.792v271.68z"  ></path>' +
    '' +
    '<path d="M62.688 355.264h815.04c11.52 0 20.896 9.344 20.896 20.896v271.68c0 11.52-9.344 20.896-20.896 20.896H62.688a20.896 20.896 0 0 1-20.896-20.896v-271.68c0-11.552 9.344-20.896 20.896-20.896zM961.312 438.848A62.72 62.72 0 0 1 1024 501.568v20.864a62.688 62.688 0 0 1-62.688 62.688v-146.272z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)