const logdiv = document.getElementById('logdiv');
let currlog = "Game started";
let menu_open = false;
let menu_text = null;
let menu_options = null;

function log_text(tex) {
  currlog += '\n'+tex;
  if (!menu_open) {
    _log_display(currlog);
  }
}

function open_menu(menutext) {
  clearKeys();
  menu_text = menutext;
  menu_open = true;
  menu_options = {};
  _log_display(menu_text);
}
function close_menu() {
  clearKeys();
  menu_text = null;
  menu_open = false;
  menu_options = null;
  _log_display(currlog);
}

function add_menu_option(optionkey, optiontext, func) {
  menu_options[optionkey.toUpperCase()] = func;
  menu_options[optionkey.toLowerCase()] = func;
  menu_text += '\n ' + optiontext;
  _log_display(menu_text);
}

function menu_check(key) {
  if (menu_options[key])
    menu_options[key]();
}

function _log_display(text) {
  logdiv.innerText = text;
}

_log_display(currlog);