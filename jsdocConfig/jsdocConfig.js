'use strict';
const rgxGross = /(\/\*{2}[\W\w]+?\*\/)\s*export\s+default\s+class\s+([^\s]*)/g;
const grossReplace = 'export default $2;\n\n$1\nclass $2';
const rgxMember = /(\@member \{[^\}]+\})(\n[^\/]+\/[\b\s]+)(this\.([^\s]+))/g;
const rgxClassName = /export (default )?class (.+?)\s/;
const rgxNamespace = /\@memberof ([\.a-zA-Z0-9]+)\s/;

exports.handlers = {
  /**
   * Called before parsing a file, giving us a change to replace the source.
   *
   * @param {*} e - The `beforeParse` event data.
   * @param {string} e.filename - The name of the file being parsed.
   * @param {string} e.source - The source of the file being parsed.
   */
  beforeParse(e) {
    const namespace = e.source.match(rgxNamespace);
    const className = e.source.match(rgxClassName);
    if (namespace && className) {
      // console.log(`${namespace[1]}.${className[2]}`);
      // Replaces "@member {Type}"" with "@member {Type} PIXI.ClassName#prop"
      e.source = e.source.replace(rgxMember, `$1 ${namespace[1]}.${className[2]}#$4$2$3`);
    }
    e.source = e.source.replace(rgxGross, grossReplace);
  },
};