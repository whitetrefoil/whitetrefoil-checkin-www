import getLogger from '@whitetrefoil/log-utils';
import './styles/initializing.scss';


const { debug, error } = getLogger(`/src/${__filename.split('?')[0]}`);


async function bootstrap() {

  // registerSW();

  const render = await import(/*webpackChunkName:"Root"*/'./Root').then(m => m.render);

  const rootDiv = document.createElement('div');
  rootDiv.id = 'root';
  document.body.appendChild(rootDiv);

  await render(rootDiv);
}


window.addEventListener('error', ev => {
  error(ev);
  if (ev.error?.name === 'ChunkLoadError') {
    // Webpack async module load failed.
    // TODO: Handle error
    window.location.assign('/error');
    return;
  }
  const div = document.getElementById('runtime-error');
  if (div == null) {
    return;
  }
  div.style.display = '';
});


bootstrap()
  .then(() => {
    debug('Bootstrapped!');

    const loadingErrorDiv = document.getElementById('loading-error');
    if (loadingErrorDiv != null) {
      loadingErrorDiv.remove();
    }
  });
