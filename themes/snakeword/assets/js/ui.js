(function (window, document) {

    var layout   = document.getElementById('layout'),
        menu     = document.getElementById('menu'),
        menuLink = document.getElementById('menuLink');

    function toggleClass(element, className) {
        var classes = element.className.split(/\s+/),
            length = classes.length,
            i = 0;

        for(; i < length; i++) {
          if (classes[i] === className) {
            classes.splice(i, 1);
            break;
          }
        }
        // The className is not found
        if (length === classes.length) {
            classes.push(className);
        }

        element.className = classes.join(' ');
    }

    menuLink.onclick = function (e) {
        var active = 'active';

        e.preventDefault();
        toggleClass(layout, active);
        toggleClass(menu, active);
        toggleClass(menuLink, active);
    };

}(this, this.document));

/* Rainbow v1.1.9 rainbowco.de */
window.Rainbow=function(){function q(a){var b,c=a.getAttribute&&a.getAttribute("data-language")||0;if(!c){a=a.attributes;for(b=0;b<a.length;++b)if("data-language"===a[b].nodeName)return a[b].nodeValue}return c}function B(a){var b=q(a)||q(a.parentNode);if(!b){var c=/\blang(?:uage)?-(\w+)/;(a=a.className.match(c)||a.parentNode.className.match(c))&&(b=a[1])}return b}function C(a,b){for(var c in e[d]){c=parseInt(c,10);if(a==c&&b==e[d][c]?0:a<=c&&b>=e[d][c])delete e[d][c],delete j[d][c];if(a>=c&&a<e[d][c]||
b>c&&b<e[d][c])return!0}return!1}function r(a,b){return'<span class="'+a.replace(/\./g," ")+(l?" "+l:"")+'">'+b+"</span>"}function s(a,b,c,h){var f=a.exec(c);if(f){++t;!b.name&&"string"==typeof b.matches[0]&&(b.name=b.matches[0],delete b.matches[0]);var k=f[0],i=f.index,u=f[0].length+i,g=function(){function f(){s(a,b,c,h)}t%100>0?f():setTimeout(f,0)};if(C(i,u))g();else{var m=v(b.matches),l=function(a,c,h){if(a>=c.length)h(k);else{var d=f[c[a]];if(d){var e=b.matches[c[a]],i=e.language,g=e.name&&e.matches?
e.matches:e,j=function(b,d,e){var i;i=0;var g;for(g=1;g<c[a];++g)f[g]&&(i=i+f[g].length);d=e?r(e,d):d;k=k.substr(0,i)+k.substr(i).replace(b,d);l(++a,c,h)};i?n(d,i,function(a){j(d,a)}):typeof e==="string"?j(d,d,e):w(d,g.length?g:[g],function(a){j(d,a,e.matches?e.name:0)})}else l(++a,c,h)}};l(0,m,function(a){b.name&&(a=r(b.name,a));if(!j[d]){j[d]={};e[d]={}}j[d][i]={replace:f[0],"with":a};e[d][i]=u;g()})}}else h()}function v(a){var b=[],c;for(c in a)a.hasOwnProperty(c)&&b.push(c);return b.sort(function(a,
b){return b-a})}function w(a,b,c){function h(b,k){k<b.length?s(b[k].pattern,b[k],a,function(){h(b,++k)}):D(a,function(a){delete j[d];delete e[d];--d;c(a)})}++d;h(b,0)}function D(a,b){function c(a,b,h,e){if(h<b.length){++x;var g=b[h],l=j[d][g],a=a.substr(0,g)+a.substr(g).replace(l.replace,l["with"]),g=function(){c(a,b,++h,e)};0<x%250?g():setTimeout(g,0)}else e(a)}var h=v(j[d]);c(a,h,0,b)}function n(a,b,c){var d=m[b]||[],f=m[y]||[],b=z[b]?d:d.concat(f);w(a.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/&(?![\w\#]+;)/g,
"&amp;"),b,c)}function o(a,b,c){if(b<a.length){var d=a[b],f=B(d);return!(-1<(" "+d.className+" ").indexOf(" rainbow "))&&f?(f=f.toLowerCase(),d.className+=d.className?" rainbow":"rainbow",n(d.innerHTML,f,function(k){d.innerHTML=k;j={};e={};p&&p(d,f);setTimeout(function(){o(a,++b,c)},0)})):o(a,++b,c)}c&&c()}function A(a,b){var a=a&&"function"==typeof a.getElementsByTagName?a:document,c=a.getElementsByTagName("pre"),d=a.getElementsByTagName("code"),f,e=[];for(f=0;f<d.length;++f)e.push(d[f]);for(f=0;f<
c.length;++f)c[f].getElementsByTagName("code").length||e.push(c[f]);o(e,0,b)}var j={},e={},m={},z={},d=0,y=0,t=0,x=0,l,p;return{extend:function(a,b,c){1==arguments.length&&(b=a,a=y);z[a]=c;m[a]=b.concat(m[a]||[])},b:function(a){p=a},a:function(a){l=a},color:function(a,b,c){if("string"==typeof a)return n(a,b,c);if("function"==typeof a)return A(0,a);A(a,b)}}}();document.addEventListener?document.addEventListener("DOMContentLoaded",Rainbow.color,!1):window.attachEvent("onload",Rainbow.color);
Rainbow.onHighlight=Rainbow.b;Rainbow.addClass=Rainbow.a;

/**
 * Generic language patterns
 *
 * @author Craig Campbell
 * @version 1.0.10
 */
Rainbow.extend([
    {
        'matches': {
            1: {
                'name': 'keyword.operator',
                'pattern': /\=/g
            },
            2: {
                'name': 'string',
                'matches': {
                    'name': 'constant.character.escape',
                    'pattern': /\\('|"){1}/g
                }
            }
        },
        'pattern': /(\(|\s|\[|\=|:)(('|")([^\\\1]|\\.)*?(\3))/gm
    },
    {
        'name': 'comment',
        'pattern': /\/\*[\s\S]*?\*\/|(\/\/|\#)[\s\S]*?$/gm
    },
    {
        'name': 'constant.numeric',
        'pattern': /\b(\d+(\.\d+)?(e(\+|\-)?\d+)?(f|d)?|0x[\da-f]+)\b/gi
    },
    {
        'matches': {
            1: 'keyword'
        },
        'pattern': /\b(and|array|as|b(ool(ean)?|reak)|c(ase|atch|har|lass|on(st|tinue))|d(ef|elete|o(uble)?)|e(cho|lse(if)?|xit|xtends|xcept)|f(inally|loat|or(each)?|unction)|global|if|import|int(eger)?|long|new|object|or|pr(int|ivate|otected)|public|return|self|st(ring|ruct|atic)|switch|th(en|is|row)|try|(un)?signed|var|void|while)(?=\(|\b)/gi
    },
    {
        'name': 'constant.language',
        'pattern': /true|false|null/g
    },
    {
        'name': 'keyword.operator',
        'pattern': /\+|\!|\-|&(gt|lt|amp);|\||\*|\=/g
    },
    {
        'matches': {
            1: 'function.call'
        },
        'pattern': /(\w+?)(?=\()/g
    },
    {
        'matches': {
            1: 'storage.function',
            2: 'entity.name.function'
        },
        'pattern': /(function)\s(.*?)(?=\()/g
    }
]);

/**
 * HTML patterns
 *
 * @author Craig Campbell
 * @version 1.0.7
 */
Rainbow.extend('html', [
    {
        'name': 'source.php.embedded',
        'matches': {
            2: {
                'language': 'php'
            }
        },
        'pattern': /&lt;\?=?(?!xml)(php)?([\s\S]*?)(\?&gt;)/gm
    },
    {
        'name': 'source.css.embedded',
        'matches': {
            0: {
                'language': 'css'
            }
        },
        'pattern': /&lt;style(.*?)&gt;([\s\S]*?)&lt;\/style&gt;/gm
    },
    {
        'name': 'source.js.embedded',
        'matches': {
            0: {
                'language': 'javascript'
            }
        },
        'pattern': /&lt;script(?! src)(.*?)&gt;([\s\S]*?)&lt;\/script&gt;/gm
    },
    {
        'name': 'comment.html',
        'pattern': /&lt;\!--[\S\s]*?--&gt;/g
    },
    {
        'matches': {
            1: 'support.tag.open',
            2: 'support.tag.close'
        },
        'pattern': /(&lt;)|(\/?\??&gt;)/g
    },
    {
        'name': 'support.tag',
        'matches': {
            1: 'support.tag',
            2: 'support.tag.special',
            3: 'support.tag-name'
        },
        'pattern': /(&lt;\??)(\/|\!?)(\w+)/g
    },
    {
        'matches': {
            1: 'support.attribute'
        },
        'pattern': /([a-z-]+)(?=\=)/gi
    },
    {
        'matches': {
            1: 'support.operator',
            2: 'string.quote',
            3: 'string.value',
            4: 'string.quote'
        },
        'pattern': /(=)('|")(.*?)(\2)/g
    },
    {
        'matches': {
            1: 'support.operator',
            2: 'support.value'
        },
        'pattern': /(=)([a-zA-Z\-0-9]*)\b/g
    },
    {
        'matches': {
            1: 'support.attribute'
        },
        'pattern': /\s(\w+)(?=\s|&gt;)(?![\s\S]*&lt;)/g
    }
], true);

/**
 * CSS patterns
 *
 * @author Craig Campbell
 * @version 1.0.7
 */
Rainbow.extend('css', [
    {
        'name': 'comment',
        'pattern': /\/\*[\s\S]*?\*\//gm
    },
    {
        'name': 'constant.hex-color',
        'pattern': /#([a-f0-9]{3}|[a-f0-9]{6})(?=;|\s)/gi
    },
    {
        'matches': {
            1: 'constant.numeric',
            2: 'keyword.unit'
        },
        'pattern': /(\d+)(px|em|cm|s|%)?/g
    },
    {
        'name': 'string',
        'pattern': /('|")(.*?)\1/g
    },
    {
        'name': 'support.css-property',
        'matches': {
            1: 'support.vendor-prefix'
        },
        'pattern': /(-o-|-moz-|-webkit-|-ms-)?[\w-]+(?=\s?:)(?!.*\{)/g
    },
    {
        'matches': {
            1: [
                {
                    'name': 'entity.name.sass',
                    'pattern': /&amp;/g
                },
                {
                    'name': 'direct-descendant',
                    'pattern': /&gt;/g
                },
                {
                    'name': 'entity.name.class',
                    'pattern': /\.[\w\-_]+/g
                },
                {
                    'name': 'entity.name.id',
                    'pattern': /\#[\w\-_]+/g
                },
                {
                    'name': 'entity.name.pseudo',
                    'pattern': /:[\w\-_]+/g
                },
                {
                    'name': 'entity.name.tag',
                    'pattern': /\w+/g
                }
            ]
        },
        'pattern': /([\w\ ,:\.\#\&\;\-_]+)(?=.*\{)/g
    },
    {
        'matches': {
            2: 'support.vendor-prefix',
            3: 'support.css-value'
        },
        'pattern': /(:|,)\s?(-o-|-moz-|-webkit-|-ms-)?([a-zA-Z-]*)(?=\b)(?!.*\{)/g
    },
    {
        'matches': {
            1: 'support.tag.style',
            2: [
                {
                    'name': 'string',
                    'pattern': /('|")(.*?)(\1)/g
                },
                {
                    'name': 'entity.tag.style',
                    'pattern': /(\w+)/g
                }
            ],
            3: 'support.tag.style'
        },
        'pattern': /(&lt;\/?)(style.*?)(&gt;)/g
    }
], true);

/**
 * Javascript patterns
 *
 * @author Craig Campbell
 * @version 1.0.8
 */
Rainbow.extend('javascript', [

    /**
     * matches $. or $(
     */
    {
        'name': 'selector',
        'pattern': /(\s|^)\$(?=\.|\()/g
    },
    {
        'name': 'support',
        'pattern': /\b(window|document)\b/g
    },
    {
        'matches': {
            1: 'support.property'
        },
        'pattern': /\.(length|node(Name|Value))\b/g
    },
    {
        'matches': {
            1: 'support.function'
        },
        'pattern': /(setTimeout|setInterval)(?=\()/g

    },
    {
        'matches': {
            1: 'support.method'
        },
        'pattern': /\.(getAttribute|push|getElementById|getElementsByClassName|log|setTimeout|setInterval)(?=\()/g
    },
    {
        'matches': {
            1: 'support.tag.script',
            2: [
                {
                    'name': 'string',
                    'pattern': /('|")(.*?)(\1)/g
                },
                {
                    'name': 'entity.tag.script',
                    'pattern': /(\w+)/g
                }
            ],
            3: 'support.tag.script'
        },
        'pattern': /(&lt;\/?)(script.*?)(&gt;)/g
    },

    /**
     * matches any escaped characters inside of a js regex pattern
     *
     * @see https://github.com/ccampbell/rainbow/issues/22
     *
     * this was causing single line comments to fail so it now makes sure
     * the opening / is not directly followed by a *
     *
     * @todo check that there is valid regex in match group 1
     */
    {
        'name': 'string.regexp',
        'matches': {
            1: 'string.regexp.open',
            2: {
                'name': 'constant.regexp.escape',
                'pattern': /\\(.){1}/g
            },
            3: 'string.regexp.close',
            4: 'string.regexp.modifier'
        },
        'pattern': /(\/)(?!\*)(.+)(\/)([igm]{0,3})/g
    },

    /**
     * matches runtime function declarations
     */
    {
        'matches': {
            1: 'storage',
            3: 'entity.function'
        },
        'pattern': /(var)?(\s|^)(\S*)(?=\s?=\s?function\()/g
    },

    /**
     * matches constructor call
     */
    {
        'matches': {
            1: 'keyword',
            2: 'entity.function'
        },
        'pattern': /(new)\s+(.*)(?=\()/g
    },

    /**
     * matches any function call in the style functionName: function()
     */
    {
        'name': 'entity.function',
        'pattern': /(\w+)(?=:\s{0,}function)/g
    }
]);

/**
 * Shell patterns
 *
 * @author Matthew King
 * @author Craig Campbell
 * @version 1.0.3
 */
Rainbow.extend('shell', [
    /**
     * This handles the case where subshells contain quotes.
     * For example: `"$(resolve_link "$name" || true)"`.
     *
     * Caveat: This really should match balanced parentheses, but cannot.
     * @see http://stackoverflow.com/questions/133601/can-regular-expressions-be-used-to-match-nested-patterns
     */
    {
        'name': 'shell',
        'matches': {
            1: {
                'language': 'shell'
            }
        },
        'pattern': /\$\(([\s\S]*?)\)/gm
    },
    {
        'matches': {
            2: 'string'
        },
        'pattern': /(\(|\s|\[|\=)(('|")[\s\S]*?(\3))/gm
    },
    {
        'name': 'keyword.operator',
        'pattern': /&lt;|&gt;|&amp;/g
    },
    {
        'name': 'comment',
        'pattern': /\#[\s\S]*?$/gm
    },
    {
        'name': 'storage.function',
        'pattern': /(.+?)(?=\(\)\s{0,}\{)/g
    },
    /**
     * Environment variables
     */
    {
        'name': 'support.command',
        'pattern': /\b(echo|rm|ls|(mk|rm)dir|cd|find|cp|exit|pwd|exec|trap|source|shift|unset)/g
    },
    {
        'matches': {
            1: 'keyword'
        },
        'pattern': /\b(break|case|continue|do|done|elif|else|esac|eval|export|fi|for|function|if|in|local|return|set|then|unset|until|while)(?=\(|\b)/g
    }
], true);