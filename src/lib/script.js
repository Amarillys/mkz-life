const title = '千代的记事本';

window.renderData = function (target) {
  fetch(target).then(res => res.text()).then(html => {
    document.querySelector('#year-list').style.display = 'none';
    const tempContainer= document.querySelector('#temp-container');
    tempContainer.innerHTML = html;
    const targetContainer = document.querySelector('#content');
    targetContainer.innerHTML = tempContainer.querySelector('#content').innerHTML;
    targetContainer.style.display = 'block';
    document.title = tempContainer.querySelector('title').innerText;
    window.history.pushState({}, target.title, target);
  });
};

window.returnHome = function (target) {
  document.querySelector('#content').style.display = 'none';
  document.querySelector('#year-list').style.display = 'block';
  document.title = title;
  window.history.pushState({}, title, window.location.origin);
}

window.requestPage = function (url, title) {

};