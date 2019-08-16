class JSON2HTML {
  static get selfCloseTags() {
    return [
      'area', 'base', 'br', 'col', 'embed', 'hr',
      'img', 'input', 'link', 'meta', 'param', 'source',
      'track', 'wbr', 'command', 'keygen', 'menuitem',
    ];
  }

  static attributtes(json) {
    if (!json.attributes) return '';
    let html = '';
    const keys = Object.keys(json.attributes);
    for (const index in keys) {
      if ({}.hasOwnProperty.call(keys, index)) {
        html += ` ${keys[index]}="${json.attributes[keys[index]]}"`;
      }
    }
    return html;
  }

  static children(json) {
    if (!json.children) return '';
    let html = '';
    for (const index in json.children) {
      if ({}.hasOwnProperty.call(json.children, index)) {
        html += JSON2HTML.build(json.children[index]);
      }
    }
    return html;
  }

  static content(json) {
    return json && json.content || '';
  }

  static build(json) {
    if (!json) return '';
    const atributes = JSON2HTML.attributtes(json);
    if (JSON2HTML.isSelfCloseTag(json)) {
      return `<${json.tag} ${atributes}/>`;
    }
    const children = JSON2HTML.children(json);
    const content = JSON2HTML.content(json);
    return `<${json.tag} ${atributes}>${children} ${content}</${json.tag}>`;
  }

  static isSelfCloseTag(json) {
    return (JSON2HTML.selfCloseTags.indexOf(json.tag)>-1);
  }
};
