'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

var CopyDefaultCssPlugin = function () {
  _createClass(CopyDefaultCssPlugin, [{
    key: 'config',
    set: function set(config) {
      var previousSettings = this.settings;
      if (!previousSettings) {
        previousSettings = {
          outputDir: "./html"
        };
      }
      this.settings = _.defaultsDeep({}, config, previousSettings);
    }
  }]);

  function CopyDefaultCssPlugin(config) {
    _classCallCheck(this, CopyDefaultCssPlugin);

    this.name = "CopyDefaultCssPlugin";
    this.config = config;
  }

  _createClass(CopyDefaultCssPlugin, [{
    key: 'run',
    value: function run(data, logger) {
      if (data.config && data.config.saveAs && data.config.saveAs.outputDir) {
        this.config = {
          outputDir: data.config.saveAs.outputDir
        };
      }
      var $ = this;
      var rootPath = data.config.rootPath || process.cwd();
      var absoluteOutputDir = path.resolve(rootPath, $.settings.outputDir);
      mkdirp(absoluteOutputDir, function (err) {
        if (err) {
          logger.log("error", err);
        }
        logger.log("verbose", "Copying default argdown.css to folder: " + absoluteOutputDir);
        var pathToDefaultCssFile = require.resolve('argdown-parser/lib/src/plugins/argdown.css');
        $.copySync(pathToDefaultCssFile, path.resolve(absoluteOutputDir, "argdown.css"));
      });
    }
  }, {
    key: 'copySync',
    value: function copySync(src, dest) {
      if (!fs.existsSync(src)) {
        return false;
      }

      var data = fs.readFileSync(src, 'utf-8');
      fs.writeFileSync(dest, data);
    }
  }]);

  return CopyDefaultCssPlugin;
}();

module.exports = {
  CopyDefaultCssPlugin: CopyDefaultCssPlugin
};
//# sourceMappingURL=CopyDefaultCssPlugin.js.map